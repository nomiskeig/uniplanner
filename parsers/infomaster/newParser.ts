import { Category, CompulsoryPartID, Course, Module, ModulePart, ModulePartToModuleMapping, ModuleToCategoryMapping, Parser } from "../types";
import fs from "fs";
import { Cheerio, Element, load } from "cheerio"

const INDEPTHTYPE = "inDepth"
const SUPPLEMENTARYTYPE = "supplementary"
const MASTERTHESIS = "masterThesis"
const PICKAREA = "pickArea"
const HIGHERQUALI = "higherQualifications"

const file = fs.readFileSync("./infomaster/infomaster.html");
const $ = load(file);

function getUnparsedCategories(): Cheerio<Element>[] {
    let list: Cheerio<Element>[] = []
    let table = $("table").first();
    let first = table.next();
    list.push(first);
    while (first.next().text() != "Module") {
        first = first.next();
        list.push(first);
    }
    return list;

}

function parseEcts(value: string): { minECTS: string, maxECTS: string } {
    if (value.match(/^[\d]+$/)) {
        return {
            minECTS: value,
            maxECTS: value
        }
    }

    else {
        return {
            minECTS: value.match(/(\d+)-(\d+)/)![1],
            maxECTS: value.match(/(\d+)-(\d+)/)![2]
        }
    }


}
export const infomasterParser: Parser = {
    getModules(): Module[] {
        let modules: Module[] = [];
        const details = $('.moduleheader');
        details.each(function(i, elem) {

            let header = elem;
            let name = "";
            let id = "";
            name = $(header).children().first().text().match(/Modul: (.*) \[/)![1];
            id = $(header).attr('id')!;
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
                        partOf.push($(elem).text());


                    });
                }

            });
            let metablockModule = $(elem).next().next();
            let ects = metablockModule.children().first().text().match(/Leistungspunkte(\d+)/)![1];

            let turnus = metablockModule.children().first().next().next().text().match(/Turnus([\D.]+)/)![1];

            let compulsoryPartsTable = metablockModule.next();
            let compulsoryPartsIDs: CompulsoryPartID[] = [];
            compulsoryPartsTable.find("tr").each(function(i, elem) {
                if (i == 0) {
                    return;

                }
                compulsoryPartsIDs.push($(elem).children().first().text());
            });

            let successControl = "";
            let content = "";
            let requirements = "";
            let recommendations = "";
            let qualificationGoals = "";

            let current = compulsoryPartsTable.next();
            while (current.hasClass("textblock")) {
                let title = current.children().first().text().trim();

                let c = "";
                current.children().each(function(i, elem) {
                    const tag = $(elem).get(0)!.tagName;
                    if (tag == "div") {
                        return;
                    }
                    if (tag == "p") {
                        if ($(elem).text().startsWith("-")) {
                            c += "\n";
                        }
                        c += " " + $(elem).text();
                    }
                    if (tag == "ul") {
                        c += "\n";
                        $(elem).children().each(function(i, elem) {
                            c += "- " + $(elem).text() + "\n";
                        });
                    }

                });
                if (title == "Erfolgskontrolle(n)") {
                    successControl = c;
                }
                if (title == "Inhalt") {
                    content = c;
                }
                if (title == "Voraussetzungen") {
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
            });


        });
        return modules;

    },


    getCategories(): Category[] {
        let categories: Category[] = [];
        let gotMasterThesis = false;

        const items = getUnparsedCategories();
        for (let elem of items) {

            let isAfter = false;
            const text = $(elem).children().first().children().first().text().trim();
            const ects = $(elem).children().first().children().first().next().children().first().next().text().trim();
            if (isAfter || text.startsWith("Modul Masterarbeit")) {
                isAfter = true;
                break;

            }

            //console.log(text);
            let parsedEcts = parseEcts(ects);

            if (text.startsWith("Vertiefungsfach")) {
                categories.push({
                    type: { name: INDEPTHTYPE },
                    name: text.match(/Vertiefungsfach: (.*)/)![1],
                    ...parsedEcts
                });


            }
            if (text.startsWith("Ergänzungsfach:")) {
                categories.push({
                    type: { name: SUPPLEMENTARYTYPE },
                    name: text.match(/Ergänzungsfach: (.*)/)![1],
                    ...parsedEcts
                });
            }

            if (text.startsWith("Wahlbereich")) {
                categories.push({
                    name: "Wahlbereich Informatik",
                    type: { name: PICKAREA },
                    ...parsedEcts
                });
            }
            if (text.startsWith("Masterarbeit") && !gotMasterThesis) {
                gotMasterThesis = true;
                categories.push({
                    type: { name: MASTERTHESIS },
                    name: "Masterarbeit",

                    ...parsedEcts
                });
            }
            if (text.startsWith("Überfachliche")) {
                categories.push({
                    type: { name: HIGHERQUALI },
                    name: "Überfachliche Qualifikationen",
                    ...parsedEcts
                });
            }

        }
        return categories;
    },

    getStudyCourseName(): string {
        return "Computer science master 2023";
    },

    getModulesToCategoryMappings(): ModuleToCategoryMapping[] {
        let mappings: ModuleToCategoryMapping[] = [];
        let list = getUnparsedCategories();
        for (let module of list) {
            const categoryname = $(module).children().first().children().first().text().trim().match(/(.*:)?(.*)/)![2].trim();

            let modules = module.find("tr.bl-compulsoryelective-item");
            modules.each(function(i, elem) {
                let moduleID = $(elem).children().first().text();
                mappings.push({
                    categoryName: categoryname,
                    moduleID: moduleID
                });



            });


        }
        return mappings;

    },
    getModulePartToModuleMappings: function(): ModulePartToModuleMapping[] {
        let mappings: ModulePartToModuleMapping[] = []
        const details = $('.brickheader');

        details.each(function(i, elem) {
            let header = elem
            let m = $(header).children().first().text().match(/Teilleistung: (.*) \[(.*)\]/)!;


            let modules = $(elem).next().find("tr").first().next().next();
            modules.find("a").each(function(i, elem) {
                console.log($(elem).text())
                const moduleID = $(elem).attr("href")!.substring(1)
                console.log(moduleID)

                mappings.push({
                   stringModuleID: moduleID,
                   stringModulePartID: m[2]
                })
            }
            )} )

        return mappings;
    },
    getModuleParts: function(): ModulePart[] {
        let parts: ModulePart[] = [];
        const details = $('.brickheader');
        details.each(function(i, elem) {
            let courses: Course[] = []

            let header = elem;
            let name = "";
            let stringID = "";
            name = $(header).children().first().text().match(/Teilleistung: (.*) \[/)![1];
            stringID = $(header).attr('id')!;
            let metatable = $(elem).next().find("tr");
            // lecturer
            let responsible = "";
            metatable.each(function(i, elem) {
                if (i == 0) responsible = $(elem).children().first().next().text().trim();

            });
            let metablockPart = $(elem).next().next();
            const metablockPartText = metablockPart.text();

            let kind = metablockPartText.match(/Teilleistungsart([\wüöä ]*)/)![1];
            let ects = metablockPartText.match(/Leistungspunkte(\d+)/)![1];

            let turnus: string | null = metablockPartText.match(/Turnus([\w öäüß]+)/) == null ? null : metablockPartText.match(/Turnus([\w öäüß]+)/)![1]
            if (turnus != null) console.log(turnus)

            let coursesTable = metablockPart.next();
            coursesTable.find("tr").each(function(i, elem) {
                if (i == 0) {
                    return;

                }
                const semester = $(elem).children().first().text();
                const id = $(elem).children().first().next().text();
                const link = $(elem).children().first().next().next().find("a").attr("href")!;
                const courseName = $(elem).children().first().next().next().text();
                const sws = $(elem).children().first().next().next().next().text();
                const type = $(elem).children().first().next().next().next().next().text();
                const responsible = $(elem).children().first().next().next().next().next().next().text();
                courses.push({
                    semester, id, link, courseName, sws, type, responsible
                })
            });

            let successControl = "";
            let content = "";
            let requirements = "";
            let recommendations = "";
            let qualificationGoals = "";

            let current = coursesTable.next();
            while (current.hasClass("textblock")) {
                let title = current.children().first().text().trim();

                let c = "";
                current.children().each(function(i, elem) {
                    const tag = $(elem).get(0)!.tagName;
                    if (tag == "div") {
                        return;
                    }
                    if (tag == "p") {
                        if ($(elem).text().startsWith("-")) {
                            c += "\n";
                        }
                        c += " " + $(elem).text();
                    }
                    if (tag == "ul") {
                        c += "\n";
                        $(elem).children().each(function(i, elem) {
                            c += "- " + $(elem).text() + "\n";
                        });
                    }

                });
                if (title == "Erfolgskontrolle(n)") {
                    successControl = c;
                }
                if (title == "Inhalt") {
                    content = c;
                }
                if (title == "Voraussetzungen") {
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




            parts.push({
                kind: kind,
                courses: courses,
                stringID: stringID,
                ects: ects,
                requirements: requirements,
                successControl: successControl,
                recommendations: recommendations,
            });

        });
        return parts;

    }
}


