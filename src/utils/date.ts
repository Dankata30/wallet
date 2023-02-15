import {log} from './logger';

const currentDateTime = (): string => {
  return new Date().toISOString().slice(0, 19).replace('T', ' ');
};

const extendCurrentDateTime = (): string => {
  const date = new Date();
  date.setHours(date.getHours() + 1);
  return date.toISOString().slice(0, 19).replace('T', ' ');
};

// compare two dates if the difference is less than an hour
const compareDates = (date1: string, date2: string): number => {
  const recorded = Date.parse(date1);
  const current = Date.parse(date2);
  const hours = (recorded - current) / 36e5;
  log.info('Timeout in: ' + hours);

  return hours;
};

export {currentDateTime, extendCurrentDateTime, compareDates};
