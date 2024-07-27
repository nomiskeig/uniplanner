import mariadb from "mariadb";
import 'dotenv/config'
import { Category, CategoryType, Module, ModulePart, ModulePartToModuleMapping, ModuleToCategoryMapping } from "./types";
let conn: null | Promise<mariadb.Connection> = null;

async function getConnection() {
    if (conn == null) {
        conn = mariadb.createConnection({
            host: 'localhost',
            port: 3306,
            database: 'uniplanner',
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            insertIdAsNumber: true,
            bigIntAsNumber: true
        })
    }
    return conn;
}
export async function closeConnection() {
    const conn = await getConnection();
    conn.end();
}
export async function dropTables() {
    const conn = await getConnection();
    try {
        await conn.query('SET foreign_key_checks = 0;')
        await conn.query('DROP TABLE if exists category, categoryType, studyCourse, module, moduleToCategoryMapping, modulePart, course, modulePartToModuleMapping');
        await conn.query('SET foreign_key_checks = 1;')
    } catch (e) {
        console.log(e)
    } finally {
    }
}

export async function createTables() {
    const conn = await getConnection();
    await conn.query('CREATE TABLE studyCourse('
        + 'studyCourse_id int auto_increment,'
        + 'name varchar(255) not null,'
        + 'primary key(studyCourse_id)'
        + ')'

    )
    await conn.query('CREATE TABLE categoryType('
        + 'categoryType_id int auto_increment,'
        + 'name varchar(255),'
        + 'studyCourse int,'
        + 'primary key(categoryType_id),'
        + 'foreign key(studyCourse) references studyCourse(studyCourse_id)'
        + ')')
    await conn.query('CREATE TABLE category('
        + 'category_id int auto_increment,'
        + 'name varchar(255) not null,'
        + 'type int,'
        + 'info text,'
        + 'minECTS int,'
        + 'maxECTS int,'
        + 'studyCourse int,'
        + 'primary key(category_id),'
        + 'foreign key(type) references categoryType(categoryType_id),'
        + 'foreign key(studyCourse) references studyCourse(studyCourse_id)'
        + ')');

    await conn.query('CREATE TABLE module('
        + 'module_id int auto_increment,'
        + 'module_string_id varchar(255) not null,'
        + 'studyCourse int,'
        + 'name varchar(255),'
        + 'turnus varchar(255),'
        + 'responsible varchar(255),'
        + 'ects int,'
        + 'requirements text,'
        + 'successControl text,'
        + 'content text,'
        + 'qualificationGoals text,'
        + 'recommendations text,'
        + 'isPractical bool,'
        + 'isSeminar bool,'
        + 'isStammmodul bool,'
        + "primary key(module_id),"
        + 'foreign key(studyCourse) references studyCourse(studyCourse_id)'

        + ')');

    await conn.query('CREATE TABLE moduleToCategoryMapping('
        + 'moduleToCategoryMapping_id int auto_increment,'
        + 'category int,'
        + 'module int,'
        + 'studyCourse int,'
        + 'primary key(moduleToCategoryMapping_id),'
        + 'foreign key(category) references category(category_id),'
        + 'foreign key(module) references module(module_id),'
        + 'foreign key(studyCourse) references studyCourse(studyCourse_id)'
        + ')');


    await conn.query('CREATE TABLE modulePart('
        + 'modulePart_id int auto_increment,'
        + 'stringID varchar(255),'
        + 'kind varchar(255),'
        + 'ects int,'
        + 'name varchar(255),'
        + 'successControl text,'
        + 'requirements text,'
        + 'recommendations text,'
        + 'studyCourse int,'
        + 'primary key(modulePart_id),'
        + 'foreign key(studyCourse) references studyCourse(studyCourse_id)'
        + ')');

    await conn.query('CREATE TABLE course('
        + 'course_id int auto_increment,'
        + 'semester varchar(255),'
        + 'id varchar(255),'
        + 'link text,'
        + 'courseName text,'
        + 'sws varchar(255),'
        + 'type varchar(255),'
        + 'studyCourse int,'
        + 'responsible text,'
        + 'modulePart int,'
        + 'primary key(course_id),'
        + 'foreign key(studyCourse) references studyCourse(studyCourse_id),'
        + 'foreign key(modulePart) references modulePart(modulePart_id)'
        + ')');
    await conn.query('CREATE TABLE modulePartToModuleMapping('
        + 'modulePartToModuleMapping_id int auto_increment,'
        + 'modulePart int,'
        + 'module int,'
        + 'studyCourse int,'
        + 'primary key(modulePartToModuleMapping_id),'
        + 'foreign key(modulePart) references modulePart(modulePart_id),'
        + 'foreign key(module) references module(module_id),'
        + 'foreign key(studyCourse) references studyCourse(studyCourse_id)'
        + ')');



}

export async function addModuleToCategoryMappings(mappings: ModuleToCategoryMapping[], studyCourseID: number) {
    const conn = await getConnection();
    const data = [];
    for (let m of mappings) {
        const categoryID = await conn.query("SELECT category_id from category where name = (?)", m.categoryName).then(res => res[0].category_id)
        const moduleID = await conn.query("SELECT module_id from module where module_string_id = (?)", m.moduleID).then(res => res[0].module_id)
        data.push([categoryID, moduleID, studyCourseID])

    }
    await conn.batch('INSERT INTO moduleToCategoryMapping (category, module, studyCourse) values (?, ?, ?)', data)


}

export async function addModules(modules: Module[], studyCourseID: number) {
    const conn = await getConnection();

    const data = modules.map(m => {
        return [m.id, studyCourseID, m.name, m.turnus, m.responsible, m.ects, m.requirements, m.successControl, m.content, m.qualificationGoals, m.recommendations, m.isPractical, m.isSeminar, m.isStammmodul]
    })
    await conn.batch('INSERT INTO module (module_string_id, studyCourse, name, turnus,responsible, ects, requirements, successControl, content, qualificationGoals, recommendations, isPractical, isSeminar, isStammmodul) values (?,?,?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', data)

}

export async function addCategoryTypes(categoryTypes: CategoryType[], studyCourseID: number) {
    const conn = await getConnection();
    const data =
        categoryTypes.map(type => {
            return [type.name, studyCourseID]
        })
    //console.log(data)
    const res = await conn.batch('INSERT INTO `categoryType` (name, studyCourse) values (?, ?)', data)
    //console.log(res)

}
export async function addCategories(categories: Category[], studyCourseID: number) {
    const conn = await getConnection();
    const categoryTypes: { name: string, categoryType_id: number }[] = await conn.query("SELECT categoryType_id, name from categoryType where studyCourse = (?)", studyCourseID);
    //console.log(categoryTypes)
    const data = categories.map(category => {
        return [category.name, categoryTypes.find(ct => ct.name == category.type.name)!.categoryType_id, "", studyCourseID, category.minECTS, category.maxECTS]
    })
    const res = await conn.batch('INSERT INTO category (name, type, info, studyCourse, minECTS, maxECTS) values (?,?,?,?,?,?)', data)


}


export async function addStudyCourse(name: string) {
    const conn = await getConnection();
    const res = await conn.query('INSERT INTO studyCourse (name) VALUES (?)', [name])

    return res.insertId;
}


export async function addModulePartsAndCourses(parts: ModulePart[], studyCourseID: number) {
    const conn = await getConnection();
    const data = parts.map(p => {
        return [p.stringID, p.kind, p.ects, p.name, p.successControl, p.requirements, p.recommendations, studyCourseID]
    })
    await conn.batch('INSERT INTO modulePart (stringID, kind, ects, name, successControl, requirements, recommendations, studyCourse) values (?,?,?,?,?,?,?,?)', data)
    const courseData: any[] = []
    for (let part of parts) {
        let partID = await conn.query("SELECT modulePart_id from modulePart where stringID = (?)", part.stringID).then(res => res[0].modulePart_id)
        part.courses.forEach(c => {
            courseData.push(
                [c.semester, c.id, c.link, c.courseName, c.sws, c.type, studyCourseID, c.responsible, partID]
            )
        })
    }
    await conn.batch('INSERT INTO course(semester, id, link, courseName, sws, type, studyCourse, responsible, modulePart) values (?,?,?,?,?,?,?,?,?)', courseData);
}
export async function addModulePartsToModuleMappings(mappings: ModulePartToModuleMapping[], studyCourseID: number) {
    const conn = await getConnection();
    const data = [];
    for (let m of mappings) {
        const modulePartID = await conn.query("SELECT modulePart_id from modulePart where stringID = (?)", m.stringModulePartID).then(res => res[0].modulePart_id);
        const moduleID = await conn.query("SELECT module_id from module where module_string_id = (?)", m.stringModuleID).then(res => res[0].module_id)
        data.push([modulePartID, moduleID, studyCourseID])
    }
    await conn.batch('INSERT INTO modulePartToModuleMapping(modulePart, module, studyCourse) values (?, ?, ?)', data);

}


export async function setup() {
    await dropTables();
    await createTables();
}
