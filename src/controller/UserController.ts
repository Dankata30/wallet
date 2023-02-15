import {
  User,
  checkUser,
  getUser,
  checkPermissions,
  registerUser,
} from '../model/User';
import {
  createSession,
  checkSession,
  deactivateSession,
  extendSession,
} from '../model/Session';
import {addParamsUser} from './SessionController';
import {log} from '../utils/logger';
import {resolve} from 'path';

export const login = (req: any, res: any) => {
  addParamsUser(req, res);

  checkUser(req, res)
    .then(() => {
      createSession(req, res);
    })
    .then(() => {
      res.end('Session started');
    })
    .catch(result => {
      log.error(result);
      res.writeHead(400);
      res.end(result);
    });
};

export const logout = (req: any, res: any) => {
  addParamsUser(req, res);

  checkSession(req, res)
    .then(() => {
      deactivateSession(req, res);
    })
    .then(() => {
      res.end('Session clossed successfully');
    })
    .catch(error => {
      log.error(error);
      res.writeHead(400);
      res.end(error);
    });
};

export const getBalance = async (req: any, res: any) => {
  addParamsUser(req, res);

  checkSession(req, res)
    .then(result => {
      extendSession(req, res);
    })
    .then(result => {
      return getUser(req, res);
    })
    .then(result => {
      if (checkPermissions(req.current_user)) {
        res.writeHead(200);
        res.end(
          `Current balance of user ${req.current_user.getUserName()} is ${req.current_user.getBalance()}`
        );
        return resolve();
      } else {
        throw new Error(
          'ERROR: Invalid permission. You cannot access this page'
        );
      }
    })
    .catch(error => {
      if (error === 'session has expired') {
        deactivateSession(req, res);
      }
      log.error(error.toString());
      res.writeHead(400);
      res.end(error.toString());
    });
};

export const register = (req: any, res: any) => {
  addParamsUser(req, res);

  registerUser(req, res)
    .then(() => {
      res.end('User created');
      return resolve();
    })
    .catch(error => {
      log.error(error.toString());
      res.writeHead(400);
      res.end(error.toString());
    });
};
