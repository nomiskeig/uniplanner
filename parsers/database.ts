import mariadb from "mariadb";
import 'dotenv/config'
import { Category, CategoryType, Module } from "./types";
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
        await conn.query('DROP TABLE if exists category, categoryType, studyCourse, module');
        await conn.query('SET foreign_key_checks = 1;')
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
        + 'name varchar(255) not null,'
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
        + 'responsible varchar(255),'
        + 'ects int,'
        + 'requirements text,'
        + 'successControl text,'
        + 'content text,'
        + 'qualificationGoals text,'
        + 'recommendations text,'
        + "primary key(module_id),"
            + 'foreign key(studyCourse) references studyCourse(studyCourse_id)'

        + ')');





}

export async function addModules(modules: Module[], studyCourseID: number) {
    const conn = await getConnection();
    
    const data = modules.map(m => {
        return [m.id, studyCourseID, m.name, m.responsible, m.ects, m.requirements, m.successControl, m.content, m.qualificationGoals, m.recommendations]
    })
    await conn.batch('INSERT INTO module (module_string_id, studyCourse, name, responsible, ects, requirements, successControl, content, qualificationGoals, recommendations) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', data)

}

export async function addCategoryTypes(categoryTypes: CategoryType[], studyCourseID: number) {
    const conn = await getConnection();
    const data =
        categoryTypes.map(type => {
            return [type.name, studyCourseID]
        })
    console.log(data)
    const res = await conn.batch('INSERT INTO `categoryType` (name, studyCourse) values (?, ?)', data)
    console.log(res)

}
export async function addCategories(categories: Category[], studyCourseID: number) {
    const conn = await getConnection();
    const categoryTypes: { name: string, categoryType_id: number }[] = await conn.query("SELECT categoryType_id, name from categoryType where studyCourse = (?)", studyCourseID);
    console.log(categoryTypes)
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
export async function setup() {
    await dropTables();
    await createTables();
}
