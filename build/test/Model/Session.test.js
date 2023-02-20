"use strict";
// Test cases for sessions
Object.defineProperty(exports, "__esModule", { value: true });
const { User } = require('../../src/model/User');
const { Session, createSession, extendSession, checkSession, deactivateSession } = require('../../src/model/Session');
const createDB_1 = require("../../src/mock_data/createDB");
const deleteDB_1 = require("../../src/mock_data/deleteDB");
// Mock the req and res objects
const req = {
    username: 'test1',
    password: 'xxx',
    user_id: '1',
    current_user: new User(1, 100, 'admin', 'xxx'),
    session_data: null
};
const res = {};
beforeAll(async () => {
    await (0, createDB_1.createTestDB)();
});
beforeEach(() => {
    jest.resetModules();
});
afterAll(() => {
    (0, deleteDB_1.deleteTestDB)();
});
describe('createSession function', () => {
    // Test function is a promise
    test('should create a session for the user', async () => {
        const result = await createSession(req, res);
        expect(result).toBe(true);
    });
    test('createSession returns a Promise', () => {
        const result = createSession(req, res);
        expect(result).toBeInstanceOf(Promise);
    });
    test('createSession returns error if user does not exist', () => {
        const req = {
            username: 'test1',
            password: 'xxx',
            user_id: '1',
            current_user: new User(5, 100, 'admin', 'fake_user')
        };
        const result = createSession(req, res);
        expect(result).rejects.toEqual('bad request');
    });
});
describe('extendSession function', () => {
    // Test function is a promise
    it('should extend the session expiry time', async () => {
        const req = {
            session_data: new Session(1, 1, 'true', 'dummydata')
        };
        const result = await extendSession(req, res);
        expect(result).toBe(true);
    });
    test('extendSession returns a Promise', () => {
        const req = {
            session_data: new Session(1, 1, 'true', 'dummydata')
        };
        const result = extendSession(req, res);
        expect(result).toBeInstanceOf(Promise);
    });
    test('extendSession returns error if user does not exist', () => {
        const req = {
            session_data: new Session("dummy", 5, 'true', 'dummydata')
        };
        const result = extendSession(req, res);
        expect(result).rejects.toEqual("Cannot extend session");
    });
});
describe('checkSession function', () => {
    // Test function is a promise
    it('should resolve with no errors if active session exists', async () => {
        await expect(checkSession(req, res)).resolves;
        expect(req.session_data).toBeDefined();
        // expect(req.session_data!.user_id).toEqual('1');
    });
    it('should reject with an error if no active session is found', async () => {
        const req = {
            user_id: '3',
            session_data: null
        };
        // await expect(checkSession(req, res)).rejects.toEqual('ERROR: No active session found. Please log in!');
        await expect(checkSession(req, res)).rejects.toEqual("ERROR: No active session found. Please log in!");
    });
    it('should reject with an error if session has expired', async () => {
        const req = {
            user_id: '2'
        };
        await expect(checkSession(req, res)).rejects.toEqual('session has expired');
    });
    it('should reject with an error if query fails', async () => {
        const req = {
            user_id: 'dummy'
        };
        await expect(checkSession(req, res)).rejects.toEqual('Database error');
    });
});
describe('deactivateSession function', () => {
    // Test function is a promise
    test('deactivateSession deactivates a session for the user', async () => {
        const result = await deactivateSession(req, res);
        expect(result).toBe(true);
    });
    test('deactivateSession returns a Promise', () => {
        const result = deactivateSession(req, res);
        expect(result).toBeInstanceOf(Promise);
    });
    test('deactivateSession returns error if user does not exist', () => {
        const req = {
            user_id: 'dummy'
        };
        const result = deactivateSession(req, res);
        expect(result).rejects.toEqual('Database Error');
    });
});
//# sourceMappingURL=Session.test.js.map