"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addParamsUser = exports.initialSetUp = void 0;
const Session_1 = require("../model/Session");
const User_1 = require("../model/User");
const logger_1 = require("../utils/logger");
const initialSetUp = (req, res) => {
    return new Promise((resolve, reject) => {
        logger_1.log.info('Initial checks');
        (0, Session_1.checkSession)(req, res)
            .then(() => {
            (0, Session_1.extendSession)(req, res);
        })
            .then(() => {
            return (0, User_1.getUser)(req, res);
        })
            .then(() => {
            return resolve();
        })
            .catch(err => {
            logger_1.log.error(err);
            reject(err);
        });
    });
};
exports.initialSetUp = initialSetUp;
const addParamsUser = (req, res) => {
    logger_1.log.info('Settling query parameters');
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
exports.addParamsUser = addParamsUser;
//# sourceMappingURL=SessionController.js.map