"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();
const general_config_1 = require("../config/general.config");
const connection = mysql.createConnection({
    multipleStatements: true,
    host: general_config_1.default.HOST,
    user: general_config_1.default.USERNAME,
    password: general_config_1.default.PASSWORD
});
const hashed_password = bcrypt.hashSync("xxx", 10);
const query = `
CREATE DATABASE test; USE test;

CREATE TABLE users (
  user_id INT NOT NULL AUTO_INCREMENT,
  balance DECIMAL(0) NULL DEFAULT 0.0,
  permissions ENUM('admin', 'user') NOT NULL,
  password VARCHAR(255) NOT NULL,
  username VARCHAR(32) NOT NULL UNIQUE,
  PRIMARY KEY (user_id)
);

CREATE TABLE transactions (
  t_id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  type ENUM('withdraw', 'deposit') NOT NULL,
  amount DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  PRIMARY KEY (t_id),
  INDEX u_id_idx (user_id ASC) VISIBLE,
  CONSTRAINT u_id
    FOREIGN KEY (user_id)
    REFERENCES users (user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

CREATE TABLE sessions (
  session_id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  is_active ENUM('true', 'false') NULL DEFAULT 'true',
  expiry DATETIME NOT NULL,
  PRIMARY KEY (session_id),
  INDEX user_id_idx (user_id ASC) VISIBLE,
  CONSTRAINT user_id
    FOREIGN KEY (user_id)
    REFERENCES users (user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

INSERT INTO users (balance, permissions, password, username)
VALUES (1000.00, 'admin', '${hashed_password}', 'test1');

INSERT INTO users (balance, permissions, password, username)
VALUES (1000.00, 'user', '${hashed_password}', 'test2');
`;
// const query = "DROP DATABASE test";
//   CREATE DATABASE databasename;
connection.query(query, (error, elements) => {
    if (error) {
        console.log(error);
    }
    //   console.log(elements);
    connection.end();
});
//# sourceMappingURL=test.js.map