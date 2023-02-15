"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = exports.checkBalance = exports.updateBalance = exports.checkPermissions = exports.getUser = exports.checkUser = exports.User = void 0;
const db_1 = require("../utils/db");
const bcrypt = require('bcrypt');
const logger_1 = require("../utils/logger");
class User {
    constructor(user_id, balance, permissions, username) {
        this.user_id = user_id;
        this.balance = balance;
        this.permissions = permissions;
        this.username = username;
    }
    getUId() {
        return this.user_id;
    }
    getBalance() {
        return this.balance;
    }
    getPermissions() {
        return this.permissions;
    }
    getUserName() {
        return this.username;
    }
    updateBalance(sum) {
        this.balance += sum;
    }
}
exports.User = User;
const checkPermissions = (user) => {
    if (user.getPermissions() === 'admin') {
        return true;
    }
    else {
        return false;
    }
};
exports.checkPermissions = checkPermissions;
const checkBalance = (user, withdraw) => {
    if (user.getBalance() < withdraw) {
        return false;
    }
    else {
        return true;
    }
};
exports.checkBalance = checkBalance;
const checkPassword = (password, actual) => {
    return bcrypt.compareSync(password, actual);
};
const checkUser = (req, res) => {
    let user = null;
    logger_1.log.info('Checking user existence');
    return new Promise((resolve, reject) => {
        const query = 'SELECT * ' + 'FROM users ' + `WHERE username = "${req.username}"`;
        console.log(query);
        db_1.connection.query(query, (error, elements) => {
            if (error) {
                logger_1.log.error(error);
                return reject(error);
            }
            console.log(elements);
            if (elements.length < 1) {
                logger_1.log.error('wrong password or username');
                return reject('Error: Wrong password or username');
            }
            if (elements.length > 0 &&
                checkPassword(req.password, elements[0].password)) {
                // if(elements.length > 0 && elements[0].password === req.password){
                user = new User(elements[0].user_id, elements[0].balance, elements[0].permissions, elements[0].username);
                req.current_user = user;
                logger_1.log.info('User exists');
                return resolve(user);
            }
            else {
                logger_1.log.error('Wrong password or username');
                return reject('Error: Wrong password or username');
            }
        });
    });
};
exports.checkUser = checkUser;
const getUser = (req, res) => {
    logger_1.log.info('Get User');
    let user = null;
    return new Promise((resolve, reject) => {
        const query = 'SELECT * ' + 'FROM users ' + `WHERE user_id = ${req.user_id};`;
        db_1.connection.query(query, (error, elements) => {
            if (error) {
                logger_1.log.error(error);
                return reject(error);
            }
            if (elements.length > 0) {
                user = new User(elements[0].user_id, elements[0].balance, elements[0].permissions, elements[0].username);
                req.current_user = user;
                logger_1.log.info('User aquired');
                return resolve();
            }
            else {
                logger_1.log.error('No such user');
                return reject('ERROR: No such user');
            }
        });
    });
};
exports.getUser = getUser;
const updateBalance = (req, res) => {
    logger_1.log.info('Updating balance');
    return new Promise((resolve, reject) => {
        const query = 'UPDATE users ' +
            `SET balance = ${req.action_type} ${req.amount_to_requested} ` +
            `WHERE user_id = ${req.current_user.getUId()};`;
        db_1.connection.query(query, (error, elements) => {
            if (error) {
                logger_1.log.error(error);
                return reject(error);
            }
            logger_1.log.info('Balance updated');
            return resolve();
        });
    });
};
exports.updateBalance = updateBalance;
const registerUser = (req, res) => {
    logger_1.log.info('Registering User');
    return new Promise((resolve, reject) => {
        const hashed_password = bcrypt.hashSync(req.password, 10);
        const query = 'INSERT INTO users (balance, permissions, password, username) ' +
            `VALUES (1000.0, "${req.role}", "${hashed_password}", "${req.username}");`;
        db_1.connection.query(query, (error, elements) => {
            if (error) {
                logger_1.log.error(error);
                return reject(error);
            }
            logger_1.log.info('User registered');
            return resolve();
        });
    });
};
exports.registerUser = registerUser;
//# sourceMappingURL=User.js.map