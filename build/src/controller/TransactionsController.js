"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withdraw = exports.deposit = exports.listTransactions = void 0;
const User_1 = require("../model/User");
const Session_1 = require("../model/Session");
const SessionController_1 = require("./SessionController");
const Transaction_1 = require("../model/Transaction");
const path_1 = require("path");
const logger_1 = require("../utils/logger");
const listTransactions = (req, res) => {
    (0, SessionController_1.addParamsUser)(req, res);
    (0, SessionController_1.initialSetUp)(req, res)
        .then(() => {
        if (!(0, User_1.checkPermissions)(req.current_user)) {
            throw new Error('Invalid permission. You cannot view transactions');
        }
        return (0, Transaction_1.getTransactions)(req, res);
    })
        .then(() => {
        res.writeHead(200);
        res.end(`The last ${req.transactions.length} transactions you have are: ${req.transactions}`);
        return (0, path_1.resolve)();
    })
        .catch(err => {
        if (err === 'session has expired') {
            (0, Session_1.deactivateSession)(req, res);
        }
        logger_1.log.error(err.toString());
        res.writeHead(400);
        res.end(err.toString());
    });
};
exports.listTransactions = listTransactions;
const deposit = (req, res) => {
    req.action = 'deposit';
    req.action_type = 'balance +';
    (0, SessionController_1.addParamsUser)(req, res);
    (0, SessionController_1.initialSetUp)(req, res)
        .then(() => {
        if (!(0, User_1.checkPermissions)(req.current_user)) {
            throw new Error('Invalid permission. You cannot deposit money');
        }
        return (0, User_1.updateBalance)(req, res);
    })
        .then(() => {
        return (0, Transaction_1.recordTransaction)(req, res);
    })
        .then(() => {
        res.writeHead(200);
        res.end(`MONEY WERE DEPOSITED: ${req.current_user.getUserName()} got ${req.amount_to_requested}`);
        return (0, path_1.resolve)();
    })
        .catch(err => {
        if (err === 'session has expired') {
            (0, Session_1.deactivateSession)(req, res);
        }
        logger_1.log.error(err.toString());
        res.writeHead(400);
        res.end(err.toString());
    });
};
exports.deposit = deposit;
const withdraw = (req, res) => {
    req.action = 'withdraw';
    req.action_type = 'balance -';
    (0, SessionController_1.addParamsUser)(req, res);
    (0, SessionController_1.initialSetUp)(req, res)
        .then(result => {
        if (!(0, User_1.checkPermissions)(req.current_user)) {
            throw new Error('Invalid permission. You cannot withdraw money!');
        }
        if (!(0, User_1.checkBalance)(req.current_user, req.amount_to_requested)) {
            throw new Error('Not sufficient funds');
        }
        return (0, User_1.updateBalance)(req, res);
    })
        .then(() => {
        return (0, Transaction_1.recordTransaction)(req, res);
    })
        .then(() => {
        res.writeHead(200);
        res.end(`MONEY WERE WITHDRAW: ${req.current_user.getUserName()} out ${req.amount_to_requested}`);
        return (0, path_1.resolve)();
    })
        .catch(err => {
        if (err === 'session has expired') {
            (0, Session_1.deactivateSession)(req, res);
        }
        logger_1.log.error(err.toString());
        res.writeHead(400);
        res.end(err.toString());
    });
};
exports.withdraw = withdraw;
//# sourceMappingURL=TransactionsController.js.map