import {connection} from '../utils/db';
import {log} from '../utils/logger';

class Transaction {
  private t_id: number;
  private user_id: number;
  private type: string;
  private amount: number;

  constructor(t_id: number, user_id: number, type: string, amount: number) {
    this.user_id = user_id;
    this.t_id = t_id;
    this.type = type;
    this.amount = amount;
  }

  public toString = (): string => {
    return `Transaction_id: ${this.t_id} Type: ${this.type} Amount: ${this.amount}`;
  };
}

const recordTransaction = (req: any, res: object): Promise<boolean> => {
  log.info('Recording transaction');
  return new Promise((resolve, reject) => {
    const query =
      'INSERT INTO ' +
      'transactions (user_id, type, amount) ' +
      `VALUES (${req.current_user.getUId()}, '${req.action}', ${
        req.amount_to_requested
      });`;

    connection.query(query, (error, elements) => {
      if (error) {
        log.error(error);
        return reject("Database Error");
      }

      log.info('Transaction recorded');
      return resolve(true);
    });
  });
};

const getTransactions = (req: any, res: object): Promise<void> => {
  // sets the value to 10 if undefined
  log.info('Get transactions');
  req.transactions_to_show ??= 10;

  return new Promise((resolve, reject) => {
    const query =
      'SELECT * ' +
      'FROM transactions ' +
      `WHERE user_id = ${req.user_id} ` +
      'ORDER BY t_id DESC ' +
      `LIMIT ${req.transactions_to_show}; `;

    connection.query(query, (error, elements) => {
      if (error) {
        log.error(error);
        return reject("Database Error");
      }

      const output = Object.keys(elements).map(key => {
        return new Transaction(
          elements[key].t_id,
          elements[key].t_id,
          elements[key].type,
          elements[key].amount
        ).toString();
      });
      req.transactions = output;

      log.info('Transactions aquired');
      return resolve();
    });
  });
};

export {Transaction, recordTransaction, getTransactions};
