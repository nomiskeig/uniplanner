import { InDepthModule } from "@/app/types";

const fs = require("fs")
import cheerio from "cheerio";

const file = fs.readFileSync('/home/simon/dev/uniplanner/htmlsources/infomaster.html')
const $ = cheerio.load(file)
const lists = $('.bl-compulsoryelective, .bl-compulsoryelective-item');
let current = lists.first();
let indepthmodules: InDepthModule[] = [];
let parsingindephmodules = true;
let i = 0;
lists.each(function(i, elem) {
    let t = $(elem).text().trim();
    if (t.startsWith("Wahlbereich")) {
        parsingindephmodules = false;
    }
    if ($(elem).text().trim().startsWith("Wahl ") && !t.startsWith("Wahl Ü")) {
        let modulename = t.match(/Wahl (.+) \(/)![1];
        indepthmodules.push({
            name: modulename,
            courses: [],
            info: t.match(/\((.*)\)/)![1]

        })

    }
    console.log("href: " + $(elem).find('a').attr('href') + " text: " + t);
    if (parsingindephmodules && $(elem).find('a').attr('href')?.startsWith("#M-")) {
            let shortenedname = t.match(/[A-Za-z0-9\-]+[\n\s]+(.*)/)![1];
       // console.log("name: " + shortenedname)
        
            indepthmodules.at(-1)?.courses.push({

            name: shortenedname,
            id: $(elem).find('a').attr('href')!

            })

    }

   // console.log($(elem).text().trim())

})
indepthmodules.forEach(module => {
    console.log(module.name);
    console.log(module.courses)
})

