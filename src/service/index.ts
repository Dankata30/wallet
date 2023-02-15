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

const http = require('http');
const port = conf.PORT;

const requestListener = (req: any, res: any) => {
  res.setHeader('Content-Type', 'application/json');

  switch (true) {
    case req.url.includes('/auth/login'):
      log.warn('/auth/login');
      login(req, res);
      break;
    case req.url.includes('/auth/logout'):
      log.warn('/auth/logout');
      logout(req, res);
      break;
    case req.url.includes('/user/balance'):
      log.warn('\n/user/balance');
      getBalance(req, res);
      break;
    case req.url.includes('/wallet/list'):
      log.warn('\n/wallet/list');
      listTransactions(req, res);
      break;
    case req.url.includes('/wallet/deposit'):
      log.warn('\n/wallet/deposit');
      deposit(req, res);
      break;
    case req.url.includes('/wallet/withdraw'):
      log.warn('\n/wallet/withdraw');
      withdraw(req, res);
      break;

    case req.url.includes('/register'):
      log.warn('\n/register');
      register(req, res);
      break;
    default:
      res.writeHead(404);
      res.end(
        JSON.stringify({
          error: 'Resource not found',
        })
      );
      break;
  }
};

const server = http.createServer(requestListener);
server.listen(port, () => {
  log.info(`\nServer is running on http://localhost:${port}`);
});
