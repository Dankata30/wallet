import {checkPermissions, updateBalance, checkBalance} from '../model/User';
import {deactivateSession} from '../model/Session';
import {initialSetUp, addParamsUser} from './SessionController';
import {recordTransaction, getTransactions} from '../model/Transaction';
import {resolve} from 'path';
import {log} from '../utils/logger';

export const listTransactions = (req: any, res: any) => {
  addParamsUser(req, res);

  initialSetUp(req, res)
    .then(() => {
      if (!checkPermissions(req.current_user)) {
        throw new Error('Invalid permission. You cannot view transactions');
      }
      return getTransactions(req, res);
    })
    .then(() => {
      res.writeHead(200);
      res.end(
        `The last ${req.transactions.length} transactions you have are: ${req.transactions}`
      );
      return resolve();
    })
    .catch(err => {
      if (err === 'session has expired') {
        deactivateSession(req, res);
      }
      log.error(err.toString());
      res.writeHead(400);
      res.end(err.toString());
    });
};

export const deposit = (req: any, res: any) => {
  req.action = 'deposit';
  req.action_type = 'balance +';
  addParamsUser(req, res);

  initialSetUp(req, res)
    .then(() => {
      if (!checkPermissions(req.current_user)) {
        throw new Error('Invalid permission. You cannot deposit money');
      }
      return updateBalance(req, res);
    })
    .then(() => {
      return recordTransaction(req, res);
    })
    .then(() => {
      res.writeHead(200);
      res.end(
        `MONEY WERE DEPOSITED: ${req.current_user.getUserName()} got ${
          req.amount_to_requested
        }`
      );
      return resolve();
    })
    .catch(err => {
      if (err === 'session has expired') {
        deactivateSession(req, res);
      }
      log.error(err.toString());
      res.writeHead(400);
      res.end(err.toString());
    });
};

export const withdraw = (req: any, res: any) => {
  req.action = 'withdraw';
  req.action_type = 'balance -';
  addParamsUser(req, res);

  initialSetUp(req, res)
    .then(result => {
      if (!checkPermissions(req.current_user)) {
        throw new Error('Invalid permission. You cannot withdraw money!');
      }

      if (!checkBalance(req.current_user, req.amount_to_requested)) {
        throw new Error('Not sufficient funds');
      }

      return updateBalance(req, res);
    })
    .then(() => {
      return recordTransaction(req, res);
    })
    .then(() => {
      res.writeHead(200);
      res.end(
        `MONEY WERE WITHDRAW: ${req.current_user.getUserName()} out ${
          req.amount_to_requested
        }`
      );
      return resolve();
    })
    .catch(err => {
      if (err === 'session has expired') {
        deactivateSession(req, res);
      }
      log.error(err.toString());
      res.writeHead(400);
      res.end(err.toString());
    });
};
