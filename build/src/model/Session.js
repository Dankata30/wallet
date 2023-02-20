"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extendSession = exports.deactivateSession = exports.checkSession = exports.createSession = exports.Session = void 0;
const db_1 = require("../utils/db");
const date_1 = require("../utils/date");
const logger_1 = require("../utils/logger");
class Session {
    constructor(session_id, user_id, is_active, expiry) {
        this.session_id = session_id;
        this.user_id = user_id;
        this.is_active = is_active;
        this.expiry = expiry;
    }
    getExpiry() {
        return this.expiry;
    }
}
exports.Session = Session;
const createSession = (req, res) => {
    logger_1.log.info('Creating Session');
    const user = req.current_user;
    return new Promise((resolve, reject) => {
        const date = (0, date_1.extendCurrentDateTime)();
        const query = 'INSERT INTO ' +
            'sessions (user_id, is_active, expiry) ' +
            `values (${user.getUId()}, '${true}', "${date}");`;
        db_1.connection.query(query, (error, elements) => {
            if (error) {
                logger_1.log.error(error);
                return reject('bad request');
            }
            logger_1.log.info('Session created');
            return resolve(true);
        });
    });
};
exports.createSession = createSession;
const extendSession = (req, res) => {
    logger_1.log.info('Extending Session');
    const session = req.session_data;
    return new Promise((resolve, reject) => {
        const date = (0, date_1.extendCurrentDateTime)();
        const query = 'UPDATE sessions ' +
            `SET expiry = '${date}' ` +
            `WHERE session_id = ${session.session_id};`;
        db_1.connection.query(query, (error, elements) => {
            if (error) {
                logger_1.log.error(error);
                return reject("Cannot extend session");
            }
            logger_1.log.info('Session extended');
            return resolve(true);
        });
    });
};
exports.extendSession = extendSession;
const checkSession = (req, res) => {
    logger_1.log.info('Checking session');
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM sessions ' +
            "WHERE is_active = 'true' " +
            `AND user_id = ${req.user_id};`;
        db_1.connection.query(query, (error, elements) => {
            if (error) {
                logger_1.log.error(error);
                return reject("Database error");
            }
            if (elements.length > 0) {
                const session = new Session(elements[0].session_id, elements[0].user_id, elements[0].is_active, elements[0].expiry);
                const hours = (0, date_1.compareDates)(session.getExpiry(), (0, date_1.currentDateTime)());
                if (hours > 0) {
                    logger_1.log.info('Session exists');
                    req.session_data = session;
                    return resolve();
                }
                else {
                    logger_1.log.error('session has expired');
                    return reject('session has expired');
                }
            }
            else {
                logger_1.log.error('No active session found. Please log in!');
                return reject('ERROR: No active session found. Please log in!');
            }
        });
    });
};
exports.checkSession = checkSession;
const deactivateSession = (req, res) => {
    logger_1.log.info('Deactivating session');
    return new Promise((resolve, reject) => {
        const query = 'UPDATE sessions ' +
            "SET is_active = 'false' " +
            `WHERE user_id = ${req.user_id};`;
        db_1.connection.query(query, (error, elements) => {
            if (error) {
                logger_1.log.error(error);
                return reject("Database Error");
            }
            logger_1.log.info('Session deativated');
            return resolve(true);
        });
    });
};
exports.deactivateSession = deactivateSession;
//# sourceMappingURL=Session.js.map