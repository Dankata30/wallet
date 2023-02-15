"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareDates = exports.extendCurrentDateTime = exports.currentDateTime = void 0;
const logger_1 = require("./logger");
const currentDateTime = () => {
    return new Date().toISOString().slice(0, 19).replace('T', ' ');
};
exports.currentDateTime = currentDateTime;
const extendCurrentDateTime = () => {
    const date = new Date();
    date.setHours(date.getHours() + 1);
    return date.toISOString().slice(0, 19).replace('T', ' ');
};
exports.extendCurrentDateTime = extendCurrentDateTime;
// compare two dates if the difference is less than an hour
const compareDates = (date1, date2) => {
    const recorded = Date.parse(date1);
    const current = Date.parse(date2);
    const hours = (recorded - current) / 36e5;
    logger_1.log.info('Timeout in: ' + hours);
    return hours;
};
exports.compareDates = compareDates;
//# sourceMappingURL=date.js.map