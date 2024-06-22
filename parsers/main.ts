import {infomasterParser} from "./infomaster/newParser.ts"


let categories = infomasterParser.getCategories();

for (let c of categories) {
    console.log(c);
}

let modules = infomasterParser.getModules();
for (let m of modules) {
    console.log(m)
}
let mappings = infomasterParser.getModulesToCategoryMappings();
for (let m of mappings) {
    console.log(m)
}
