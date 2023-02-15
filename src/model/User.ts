import {request} from 'http';
import {connection} from '../utils/db';
const bcrypt = require('bcrypt');
import {log} from '../utils/logger';

class User {
  private user_id: number;
  private balance: number;
  private permissions: string;
  private username: string;

  constructor(
    user_id: number,
    balance: number,
    permissions: string,
    username: string
  ) {
    this.user_id = user_id;
    this.balance = balance;
    this.permissions = permissions;
    this.username = username;
  }

  public getUId(): number {
    return this.user_id;
  }

  public getBalance(): number {
    return this.balance;
  }

  public getPermissions(): string {
    return this.permissions;
  }

  public getUserName(): string {
    return this.username;
  }

  public updateBalance(sum: number): void {
    this.balance += sum;
  }
}

const checkPermissions = (user: User): boolean => {
  if (user.getPermissions() === 'admin') {
    return true;
  } else {
    return false;
  }
};

const checkBalance = (user: User, withdraw: number): boolean => {
  if (user.getBalance() < withdraw) {
    return false;
  } else {
    return true;
  }
};

const checkPassword = (password: string, actual: string): boolean => {
  return bcrypt.compareSync(password, actual);
};

const checkUser = (req: any, res: object): Promise<User> => {
  let user = null;
  log.info('Checking user existence');

  return new Promise((resolve, reject) => {
    const query =
      'SELECT * ' + 'FROM users ' + `WHERE username = "${req.username}"`;

    connection.query(query, (error, elements) => {
      if (error) {
        log.error(error);
        return reject(error);
      }

      if (elements.length < 1) {
        log.error('wrong password or username');
        return reject('Error: Wrong password or username');
      }

      if (
        elements.length > 0 &&
        checkPassword(req.password, elements[0].password)
      ) {
        // if(elements.length > 0 && elements[0].password === req.password){
        user = new User(
          elements[0].user_id,
          elements[0].balance,
          elements[0].permissions,
          elements[0].username
        );
        req.current_user = user;
        log.info('User exists');
        return resolve(user);
      } else {
        log.error('Wrong password or username');
        return reject('Error: Wrong password or username');
      }
    });
  });
};

const getUser = (req: any, res: object): Promise<void> => {
  log.info('Get User');
  let user = null;
  return new Promise((resolve, reject) => {
    const query =
      'SELECT * ' + 'FROM users ' + `WHERE user_id = ${req.user_id};`;

    connection.query(query, (error, elements) => {
      if (error) {
        log.error(error);
        return reject(error);
      }

      if (elements.length > 0) {
        user = new User(
          elements[0].user_id,
          elements[0].balance,
          elements[0].permissions,
          elements[0].username
        );
        req.current_user = user;
        log.info('User aquired');
        return resolve();
      } else {
        log.error('No such user');
        return reject('ERROR: No such user');
      }
    });
  });
};

const updateBalance = (req: any, res: object): Promise<void> => {
  log.info('Updating balance');
  return new Promise((resolve, reject) => {
    const query =
      'UPDATE users ' +
      `SET balance = ${req.action_type} ${req.amount_to_requested} ` +
      `WHERE user_id = ${req.current_user.getUId()};`;

    connection.query(query, (error, elements) => {
      if (error) {
        log.error(error);
        return reject(error);
      }

      log.info('Balance updated');
      return resolve();
    });
  });
};

const registerUser = (req: any, res: object): Promise<void> => {
  log.info('Registering User');
  return new Promise((resolve, reject) => {
    const hashed_password = bcrypt.hashSync(req.password, 10);

    const query =
      'INSERT INTO users (balance, permissions, password, username) ' +
      `VALUES (1000.0, "${req.role}", "${hashed_password}", "${req.username}");`;

    connection.query(query, (error, elements) => {
      if (error) {
        log.error(error);
        return reject(error);
      }

      log.info('User registered');
      return resolve();
    });
  });
};

export {
  User,
  checkUser,
  getUser,
  checkPermissions,
  updateBalance,
  checkBalance,
  registerUser,
};
