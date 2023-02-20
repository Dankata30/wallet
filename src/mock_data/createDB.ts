import {Connection} from 'mysql';
import {currentDateTime} from '../utils/date'
const mysql = require('mysql');
const bcrypt = require('bcrypt');

const dotenv = require('dotenv')
dotenv.config();

import conf from '../config/general.config';


export const createTestDB= () : Promise<void> => {

  return new Promise ((resolve, reject)=>{
    const connection: Connection = mysql.createConnection({
      multipleStatements: true,
      host: conf.HOST,
      user: conf.USERNAME,
      password: conf.PASSWORD
  });

  const hashed_password = bcrypt.hashSync("xxx", 10);

  const query = `
  CREATE DATABASE IF NOT EXISTS test; 
  
  USE test;

  CREATE TABLE IF NOT EXISTS users (
    user_id INT NOT NULL AUTO_INCREMENT,
    balance DECIMAL(0) NULL DEFAULT 0.0,
    permissions ENUM('admin', 'user') NOT NULL,
    password VARCHAR(255) NOT NULL,
    username VARCHAR(32) NOT NULL UNIQUE,
    PRIMARY KEY (user_id)
  );

  CREATE TABLE IF NOT EXISTS transactions (
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

  CREATE TABLE IF NOT EXISTS sessions (
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

  INSERT INTO users (balance, permissions, password, username)
  VALUES (1000.00, 'user', '${hashed_password}', 'test3');
  
  INSERT INTO sessions (user_id, is_active, expiry) 
  VALUES (1, 'true', '2021-02-28 23:59:59');
  
  INSERT INTO sessions (user_id, is_active, expiry) 
  VALUES (2, 'true', '2021-02-28 23:59:59');
  
  INSERT INTO sessions (user_id, is_active, expiry) 
  VALUES (3, 'false', '${currentDateTime()}');
  
  INSERT INTO transactions (user_id, type, amount) 
  VALUES (1, 'deposit', '100');
  
  INSERT INTO transactions (user_id, type, amount) 
  VALUES (1, 'withdraw', '50');
  
  INSERT INTO transactions (user_id, type, amount) 
  VALUES (3, 'deposit', '50');
  `

  connection.query(query, (error, elements) => {
      if (error) {
      console.log(error);
      reject(error);
      }

      connection.end()
      resolve();
    })
  })
}