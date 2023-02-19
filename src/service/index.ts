import {
  login,
  logout,
  getBalance,
  register,
} from '../controller/UserController';
import {
  deposit,
  withdraw,
  listTransactions,
} from '../controller/TransactionsController';
import {log} from '../utils/logger';

const dotenv = require('dotenv')
dotenv.config();

import conf from "../config/general.config"
import { request } from 'http';

const http = require('http');
const port = conf.PORT;

const requestListener = (req: any, res: any) => {
  res.setHeader('Content-Type', 'application/json');

  switch (true) {
    case req.url.includes('/auth/login') && req.method === "POST":
      log.warn('/auth/login');
      login(req, res);
      break;
    case req.url.includes('/auth/logout') && req.method === "POST":
      log.warn('/auth/logout');
      logout(req, res);
      break;
    case req.url.includes('/user/balance') && req.method === "GET":
      log.warn('\n/user/balance');
      getBalance(req, res);
      break;
    case req.url.includes('/wallet/list') && req.method === "GET":
      log.warn('\n/wallet/list');
      listTransactions(req, res);
      break;
    case req.url.includes('/wallet/deposit') && req.method === "PUT":
      log.warn('\n/wallet/deposit');
      deposit(req, res);
      break;
    case req.url.includes('/wallet/withdraw') && req.method === "PUT":
      log.warn('\n/wallet/withdraw');
      withdraw(req, res);
      break;

    case req.url.includes('/register') && req.method === "POST":
      log.warn('\n/register');
      register(req, res);
      break;
    default:
      res.writeHead(404);
      res.end(
        JSON.stringify({
          error: `Resource not found: ${req.method} ${req.url}`,
        })
      );
      break;
  }
};

const server = http.createServer(requestListener);
server.listen(port, () => {
  log.info(`\nServer is running on http://localhost:${port}`);
});
