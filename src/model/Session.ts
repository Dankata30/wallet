import {connection} from '../utils/db';
import {
  currentDateTime,
  extendCurrentDateTime,
  compareDates,
} from '../utils/date';
import {log} from '../utils/logger';

class Session {
  private session_id: number;
  private user_id: number;
  private is_active: boolean;
  private expiry: string;

  constructor(
    session_id: number,
    user_id: number,
    is_active: boolean,
    expiry: string
  ) {
    this.session_id = session_id;
    this.user_id = user_id;
    this.is_active = is_active;
    this.expiry = expiry;
  }

  public getExpiry(): string {
    return this.expiry;
  }
}

const createSession = (req: any, res: object): Promise<boolean> => {
  log.info('Creating Session');

  const user = req.current_user;
  return new Promise((resolve, reject) => {
    const date = extendCurrentDateTime();
    const query =
      'INSERT INTO ' +
      'sessions (user_id, is_active, expiry) ' +
      `values (${user.getUId()}, '${true}', "${date}");`;

    connection.query(query, (error, elements) => {
      if (error) {
        log.error(error);
        return reject('bad request');
      }

      log.info('Session created');
      return resolve(true);
    });
  });
};

const extendSession = (req: any, res: object): Promise<boolean> => {
  log.info('Extending Session');
  const session = req.session_data;

  return new Promise((resolve, reject) => {
    const date = extendCurrentDateTime();

    const query =
      'UPDATE sessions ' +
      `SET expiry = '${date}' ` +
      `WHERE session_id = ${session.session_id};`;

    connection.query(query, (error, elements) => {
      if (error) {
        log.error(error);
        return reject("Cannot extend session");
      }

      log.info('Session extended');
      return resolve(true);
    });
  });
};

const checkSession = (req: any, res: object): Promise<void> => {
  log.info('Checking session');
  return new Promise((resolve, reject) => {
    const query =
      'SELECT * FROM sessions ' +
      "WHERE is_active = 'true' " +
      `AND user_id = ${req.user_id};`;

    connection.query(query, (error, elements) => {
      if (error) {
        log.error(error);
        return reject("Database error");
      }

      if (elements.length > 0) {
        const session = new Session(
          elements[0].session_id,
          elements[0].user_id,
          elements[0].is_active,
          elements[0].expiry
        );

        const hours = compareDates(session.getExpiry(), currentDateTime());

        if (hours > 0) {
          log.info('Session exists');
          req.session_data = session;
          return resolve();
        } else {
          log.error('session has expired');
          return reject('session has expired');
        }
      } else {
        log.error('No active session found. Please log in!');
        return reject('ERROR: No active session found. Please log in!');
      }
    });
  });
};

const deactivateSession = (req: any, res: object): Promise<boolean> => {
  log.info('Deactivating session');
  return new Promise((resolve, reject) => {
    const query =
      'UPDATE sessions ' +
      "SET is_active = 'false' " +
      `WHERE user_id = ${req.user_id};`;

    connection.query(query, (error, elements) => {
      if (error) {
        log.error(error);
        return reject("Database Error");
      }
      log.info('Session deativated');
      return resolve(true);
    });
  });
};

export {Session, createSession, checkSession, deactivateSession, extendSession};
