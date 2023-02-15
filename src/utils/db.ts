import {Connection} from 'mysql';
import {log} from './logger';
const mysql = require('mysql');

const dotenv = require('dotenv')
dotenv.config();

import conf from '../config/general.config';

const connection: Connection = mysql.createConnection({
  host: conf.HOST,
  user: conf.USERNAME,
  password: conf.PASSWORD,
  database: conf.DATABASE,
});

if(connection){
  log.info('\nConnection with db established');
}

export {connection};
