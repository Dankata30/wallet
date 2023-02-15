import {Connection} from 'mysql';
const mysql = require('mysql');

const dotenv = require('dotenv')
dotenv.config();

import conf from '../config/general.config';

export const deleteTestDB = () => {
    const connection: Connection = mysql.createConnection({
        host: conf.HOST,
        user: conf.USERNAME,
        password: conf.PASSWORD
    });

    const query = "DROP DATABASE test";

    connection.query(query, (error, elements) => {
        if (error) {
        console.log(error);
        }
        connection.end()
    })
}
