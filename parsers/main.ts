import { addCategories, closeConnection,  addCategoryTypes, addStudyCourse, setup, addModules } from "./database.ts";
import {infomasterParser} from "./infomaster/newParser.ts"
import { CategoryType } from "./types.ts";


let categories = infomasterParser.getCategories();

let categoryTypes: CategoryType[] = [];
for (let c of categories) {
    if (!categoryTypes.find(type => type.name == c.type.name)) {
        categoryTypes.push({
            name: c.type.name
        })
    }
    
}


let modules = infomasterParser.getModules();
for (let m of modules) {
    //console.log(m)
}
let mappings = infomasterParser.getModulesToCategoryMappings();
for (let m of mappings) {
    //console.log(m)
}




async function insertData() {
    await setup();
    const studyCourseID = await addStudyCourse(infomasterParser.getStudyCourseName())
    await addCategoryTypes(categoryTypes, studyCourseID);
    await addCategories(categories, studyCourseID);
    await addModules(modules, studyCourseID);
    await closeConnection();

}

insertData();
