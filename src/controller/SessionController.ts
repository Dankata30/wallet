import {checkSession, extendSession} from '../model/Session';
import {getUser} from '../model/User';
import {log} from '../utils/logger';

export const initialSetUp = (req: any, res: object): Promise<void> => {
  return new Promise((resolve, reject) => {
    log.info('Initial checks');

    checkSession(req, res)
      .then(() => {
        extendSession(req, res);
      })
      .then(() => {
        return getUser(req, res);
      })
      .then(() => {
        return resolve();
      })
      .catch(err => {
        log.error(err);
        reject(err);
      });
  });
};

export const addParamsUser = (req: any, res: object): void => {
  log.info('Settling query parameters');

  const urlParams = new URL('http://localhost:3000' + req.url).searchParams;
  if (urlParams.get('username')) {
    req.username = urlParams.get('username');
  }
  if (urlParams.get('password')) {
    req.password = urlParams.get('password');
  }
  if (urlParams.get('user_id')) {
    req.user_id = urlParams.get('user_id');
  }
  if (urlParams.get('amount_to_requested')) {
    req.amount_to_requested = urlParams.get('amount_to_requested');
  }
  if (urlParams.get('transactions_to_show')) {
    req.transactions_to_show = urlParams.get('transactions_to_show');
  }
  if (urlParams.get('role')) {
    req.role = urlParams.get('role');
  }
};
