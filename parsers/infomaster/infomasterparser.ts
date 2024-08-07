const fs = require("fs")
import cheerio from "cheerio";
import { CompulsoryPartID, InDepthModule, Module } from "../types";

const file = fs.readFileSync('/home/simon/dev/uniplanner/htmlsources/infomaster.html')
const $ = cheerio.load(file)
const lists = $('.bl-compulsoryelective, .bl-compulsoryelective-item');
let indepthmodules: InDepthModule[] = parseInDepthModules();
fs.writeFile('/home/simon/dev/uniplanner/parsers/infomasterIndepthModuls.json', JSON.stringify(indepthmodules), (err: any) => {});

export function parseInDepthModules() {
    let modules: InDepthModule[] = []
    let parsingindephmodules = true;
    let i = 0;
    let allModules: InDepthModule = {
        name: "all modules",
        modules: [],
        info: "contains all modules"

    }
    modules.push(allModules)
    lists.each(function(i, elem) {
        let t = $(elem).text().trim();
        if (t.startsWith("Wahlbereich")) {
            parsingindephmodules = false;
        }
        if ($(elem).text().trim().startsWith("Wahl ") && !t.startsWith("Wahl Ü")) {
            let modulename = t.match(/Wahl (.+) \(/)![1];
            modules.push({
                name: modulename,
                modules: [],
                info: t.match(/\((.*)\)/)![1]

            })

        }
        //console.log("href: " + $(elem).find('a').attr('href') + " text: " + t);
        if (parsingindephmodules && $(elem).find('a').attr('href')?.startsWith("#M-")) {
            //let shortenedname = t.match(/[A-Za-z0-9\-]+[\n\s]+(.*)/)![1];
            // console.log("name: " + shortenedname)

            //indepthmodules.at(-1)?.courses.push({

            //name: shortenedname,
            //id: $(elem).find('a').attr('href')!

            //})
            modules.at(-1)!.modules.push($(elem).find("a").attr('href')!.substring(1));
            allModules.modules.push($(elem).find("a").attr('href')!.substring(1))

        }

        // console.log($(elem).text().trim())

    })
    return modules;

}

let modules = parseModules();
// add the partof things to the modules

for (let module of modules) {
    for (let indepthmodule of indepthmodules) {
        if (indepthmodule.modules.includes(module.id)) {
            module.partOf.push(indepthmodule)
        }

    }

}
//console.log(JSON.stringify(modules));
fs.writeFile('/home/simon/dev/uniplanner/parsers/infomasterModuls.json', JSON.stringify(modules), (err: any) => {});
//console.log(modules)
//let partPerformances = parsePartPerformances();
export function parseModules(): Module[] {

    // parse the details of the modules
    let modules: Module[] = []
    const details = $('.moduleheader')
    details.each(function(i, elem) {

        let header = elem;
        let name = "";
        let id = "";
        name = $(header).children().first().text().match(/Modul: (.*) \[/)![1]
        id = $(header).attr('id')!
        //console.log(name, id)

        let metatable = $(elem).next().find("tr");
        let partOf: String[] = [];
        //console.log(metatable.text())
        // lecturer
        let responsible = "";
        metatable.each(function(i, elem) {
            if (i == 0) responsible = $(elem).children().first().next().text().trim();
            if (i == 2) {
                let parts = $(elem).children().first().next().children();
                parts.each(function(i, elem) {
                    partOf.push($(elem).text())


                })
            }

        })
        let metablockModule = $(elem).next().next();
        let ects = metablockModule.children().first().text().match(/Leistungspunkte(\d+)/)![1];

        let turnus = metablockModule.children().first().next().next().text().match(/Turnus([\D.]+)/)![1]

        let compulsoryPartsTable = metablockModule.next();
        let compulsoryPartsIDs: CompulsoryPartID[] = [];
        compulsoryPartsTable.find("tr").each(function(i, elem) {
            if (i == 0) {
                return;

            }
            compulsoryPartsIDs.push($(elem).children().first().text());
        })

        let successControl = "";
        let content = "";
        let requirements = "";
        let recommendations = "";
        let qualificationGoals = "";

        let current = compulsoryPartsTable.next();
        while (current.hasClass("textblock")) {
            //console.log(current.text());
            let title = current.children().first().text().trim();

            let c = current.children().first().next().text().trim();
            //console.log(title)
            //console.log(content)
            if (title == "Erfolgskontrolle(n)") {
                successControl = c;
            }
            if (title == "Inhalt") {
                content = c;
            }
            if (title == "Vorraussetzungen") {
                requirements = c;
            }
            if (title == "Empfehlungen") {
                recommendations = c;
            }
            if (title == "Qualifikationsziele") {
                qualificationGoals = c;
            }

            current = current.next();
        }
        //console.log(successControl)




        modules.push({
            name: name,
            id: id,
            responsible: responsible,
            ects: ects,
            turnus: turnus,
            compulsoryParts: compulsoryPartsIDs,
            requirements: requirements,
            successControl: successControl,
            content: content,
            qualificationGoals: qualificationGoals,
            recommendations: recommendations,
            partOf: []



        })


    })
    return modules; 
}

