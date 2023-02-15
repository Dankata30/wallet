import {Connection} from 'mysql';
import {log} from './logger';
const mysql = require('mysql');


const connection: Connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'wallet',
});

log.info('\nConnection with db established');

export {connection};
