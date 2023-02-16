import {Connection} from 'mysql';
const mysql = require('mysql');
const bcrypt = require('bcrypt');

import {createTestDB} from '../mock_data/createDB'
import {deleteTestDB} from '../mock_data/deleteDB'

const dotenv = require('dotenv')
dotenv.config();

import conf from '../config/general.config';

const connection: Connection = mysql.createConnection({
    multipleStatements: true,
    host: conf.HOST,
    user: conf.USERNAME,
    password: conf.PASSWORD
});


createTestDB
deleteTestDB

// const hashed_password = bcrypt.hashSync("xxx", 10);
// const query = ""
// // const query = "DROP DATABASE test";
//     //   CREATE DATABASE databasename;

//     connection.query(query, (error, elements) => {
//       if (error) {
//         console.log(error);
//       }

//       //   console.log(elements);
//       connection.end()
//     })