"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.getBalance = exports.logout = exports.login = void 0;
const User_1 = require("../model/User");
const Session_1 = require("../model/Session");
const SessionController_1 = require("./SessionController");
const logger_1 = require("../utils/logger");
const path_1 = require("path");
const login = (req, res) => {
    (0, SessionController_1.addParamsUser)(req, res);
    (0, User_1.checkUser)(req, res)
        .then(() => {
        (0, Session_1.createSession)(req, res);
    })
        .then(() => {
        res.end('Session started');
    })
        .catch(result => {
        logger_1.log.error(result);
        res.writeHead(400);
        res.end(result);
    });
};
exports.login = login;
const logout = (req, res) => {
    (0, SessionController_1.addParamsUser)(req, res);
    (0, Session_1.checkSession)(req, res)
        .then(() => {
        (0, Session_1.deactivateSession)(req, res);
    })
        .then(() => {
        res.end('Session clossed successfully');
    })
        .catch(error => {
        logger_1.log.error(error);
        res.writeHead(400);
        res.end(error);
    });
};
exports.logout = logout;
const getBalance = async (req, res) => {
    (0, SessionController_1.addParamsUser)(req, res);
    (0, Session_1.checkSession)(req, res)
        .then(result => {
        (0, Session_1.extendSession)(req, res);
    })
        .then(result => {
        return (0, User_1.getUser)(req, res);
    })
        .then(result => {
        if ((0, User_1.checkPermissions)(req.current_user)) {
            res.writeHead(200);
            res.end(`Current balance of user ${req.current_user.getUserName()} is ${req.current_user.getBalance()}`);
            return (0, path_1.resolve)();
        }
        else {
            throw new Error('ERROR: Invalid permission. You cannot access this page');
        }
    })
        .catch(error => {
        if (error === 'session has expired') {
            (0, Session_1.deactivateSession)(req, res);
        }
        logger_1.log.error(error.toString());
        res.writeHead(400);
        res.end(error.toString());
    });
};
exports.getBalance = getBalance;
const register = (req, res) => {
    (0, SessionController_1.addParamsUser)(req, res);
    (0, User_1.registerUser)(req, res)
        .then(() => {
        res.end('User created');
        return (0, path_1.resolve)();
    })
        .catch(error => {
        logger_1.log.error(error.toString());
        res.writeHead(400);
        res.end(error.toString());
    });
};
exports.register = register;
//# sourceMappingURL=UserController.js.map