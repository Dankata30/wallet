"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransactions = exports.recordTransaction = exports.Transaction = void 0;
const db_1 = require("../utils/db");
const logger_1 = require("../utils/logger");
class Transaction {
    constructor(t_id, user_id, type, amount) {
        this.toString = () => {
            return `Transaction_id: ${this.t_id} Type: ${this.type} Amount: ${this.amount}`;
        };
        this.user_id = user_id;
        this.t_id = t_id;
        this.type = type;
        this.amount = amount;
    }
}
exports.Transaction = Transaction;
const recordTransaction = (req, res) => {
    logger_1.log.info('Recording transaction');
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO ' +
            'transactions (user_id, type, amount) ' +
            `VALUES (${req.current_user.getUId()}, '${req.action}', ${req.amount_to_requested});`;
        db_1.connection.query(query, (error, elements) => {
            if (error) {
                logger_1.log.error(error);
                return reject(error);
            }
            logger_1.log.info('Transaction recorded');
            return resolve(true);
        });
    });
};
exports.recordTransaction = recordTransaction;
const getTransactions = (req, res) => {
    var _a;
    // sets the value to 10 if undefined
    logger_1.log.info('Get transactions');
    (_a = req.transactions_to_show) !== null && _a !== void 0 ? _a : (req.transactions_to_show = 10);
    return new Promise((resolve, reject) => {
        const query = 'SELECT * ' +
            'FROM transactions ' +
            `WHERE user_id = ${req.user_id} ` +
            'ORDER BY t_id DESC ' +
            `LIMIT ${req.transactions_to_show}; `;
        db_1.connection.query(query, (error, elements) => {
            if (error) {
                logger_1.log.error(error);
                return reject(error);
            }
            const output = Object.keys(elements).map(key => {
                return new Transaction(elements[key].t_id, elements[key].t_id, elements[key].type, elements[key].amount).toString();
            });
            req.transactions = output;
            logger_1.log.info('Transactions aquired');
            return resolve();
        });
    });
};
exports.getTransactions = getTransactions;
//# sourceMappingURL=Transaction.js.map