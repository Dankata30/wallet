"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
const logger_1 = require("./logger");
const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();
const general_config_1 = require("../config/general.config");
const connection = mysql.createConnection({
    host: general_config_1.default.HOST,
    user: general_config_1.default.USERNAME,
    password: general_config_1.default.PASSWORD,
    database: general_config_1.default.DATABASE,
});
exports.connection = connection;
if (connection) {
    logger_1.log.info('\nConnection with db established');
}
//# sourceMappingURL=db.js.map