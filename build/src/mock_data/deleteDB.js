"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTestDB = void 0;
const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();
const general_config_1 = require("../config/general.config");
const deleteTestDB = () => {
    const connection = mysql.createConnection({
        host: general_config_1.default.HOST,
        user: general_config_1.default.USERNAME,
        password: general_config_1.default.PASSWORD
    });
    const query = "DROP DATABASE test";
    connection.query(query, (error, elements) => {
        if (error) {
            console.log(error);
        }
        connection.end();
    });
};
exports.deleteTestDB = deleteTestDB;
//# sourceMappingURL=deleteDB.js.map