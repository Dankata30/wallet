"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const createDB_1 = require("../mock_data/createDB");
const deleteDB_1 = require("../mock_data/deleteDB");
const dotenv = require('dotenv');
dotenv.config();
const general_config_1 = require("../config/general.config");
const connection = mysql.createConnection({
    multipleStatements: true,
    host: general_config_1.default.HOST,
    user: general_config_1.default.USERNAME,
    password: general_config_1.default.PASSWORD
});
createDB_1.createTestDB;
deleteDB_1.deleteTestDB;
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
//# sourceMappingURL=test.js.map