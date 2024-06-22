import mariadb from "mariadb";
import 'dotenv/config'

async function createConnection() {
    const conn = await mariadb.createConnection({
        host: 'localhost',
        port: 3306,
        database: 'uniplanner',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    })
    return conn;
}
export async function dropTables() {
}

export async function createTables() {
    const conn = await createConnection();
    try {
        await conn.query('CREATE TABLE if not exists studyCourse('
            + 'studyCourse_id int auto_increment,'
            + 'name varchar(255) not null,'
            + 'primary key(studyCourse_id)'
            + ')'

        )
        await conn.query('CREATE TABLE if not exists categoryType('
            + 'categoryType_id int auto_increment,'
            + 'name varchar(255) not null,' 
            + 'studyCourse int,'
            + 'primary key(categoryType_id),'
            + 'foreign key(studyCourse) references studyCourse(studyCourse_id)'
            + ')')
        const res = await conn.query('CREATE TABLE category('
            + 'name varchar(255) not null,'
            + 'type int,'
                + 'info text,'
                + 'studyCourse int,'
            + 'primary key(name),'
            + 'foreign key(type) references categoryType(categoryType_id),'
            + 'foreign key(studyCourse) references categoryType(categoryType_id)'

            + ')');
    
        console.log(res);
        return res;
    } finally {
        conn.end();
    }



}

dropTables();
createTables();
