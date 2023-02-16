"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Import the necessary modules and dependencies
const { User, checkUser, updateBalance, registerUser, getUser, checkBalance, checkPassword, checkPermissions } = require('../../src/model/User');
const createDB_1 = require("../../src/mock_data/createDB");
const deleteDB_1 = require("../../src/mock_data/deleteDB");
// Mock the req and res objects
const req = {
    username: 'test1',
    password: 'xxx',
    user_id: '1',
    current_user: null
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
describe('checkUser function', () => {
    // Test function is a promise
    test('checkUser returns a Promise', () => {
        const result = checkUser(req, res);
        expect(result).toBeInstanceOf(Promise);
    });
    test('should return a User object when the correct username and password are provided', async () => {
        const user = await checkUser(req, res);
        const actualUser = new User(1, 1000, 'admin', 'test1');
        expect(actualUser).toBeInstanceOf(User);
        expect(actualUser.username).toBe(req.username);
    });
    test('checkUser returns an error message if the username is incorrect', async () => {
        const req = { username: 'incorrectUser', password: 'testPassword' };
        const res = {};
        await expect(checkUser(req, res)).rejects.toEqual('Error: Wrong password or username');
    });
    test('checkUser returns an error message if the password is incorrect', async () => {
        const req = { username: 'testUser', password: 'incorrectPassword' };
        const res = {};
        await expect(checkUser(req, res)).rejects.toEqual('Error: Wrong password or username');
    });
});
describe('updateBalance/registerUser/getUser function', () => {
    test('updateBalance fullfills', async () => {
        const req = {
            action_type: '+',
            amount_to_requested: 100,
            current_user: new User(1, 500, 'user', 'testUser')
        };
        const res = {};
        const result = await updateBalance(req, res);
        expect(result).resolves;
    });
    test('updateBalance rejects', async () => {
        const req = {
            action_type: '+',
            amount_to_requested: 100,
            current_user: new User(10, 500, 'user', 'badUser')
        };
        const res = {};
        await expect(updateBalance(req, res)).rejects;
    });
    test('registerUser fullfills', async () => {
        const req = {
            password: '123',
            role: 'admin',
            username: 'user1'
        };
        const res = {};
        const result = await registerUser(req, res);
        expect(result).resolves;
    });
    test('registerUser rejects', async () => {
        const req = {
            password: '123',
            role: 'admin',
            username: 'user1'
        };
        const res = {};
        await expect(registerUser(req, res)).rejects.toMatch('User name taken. Please user other username');
    });
});
describe('getUser function', () => {
    test('sets the current_user property of the request object when the user is found', async () => {
        const req = { user_id: 1,
            current_user: "Hello"
        };
        await getUser(req, res);
        const actualUser = new User(1, 100, 'admin', 'test1');
        expect(req.current_user).toEqual(actualUser);
    });
    test('rejects with an error message when the user is not found', async () => {
        const req = { user_id: 10 };
        await expect(getUser(req, res)).rejects.toMatch('ERROR: No such user');
    });
});
describe('checkPermissions', () => {
    test('returns true if user has admin permissions', () => {
        const user = new User(1, 1000, 'admin', 'test1');
        expect(checkPermissions(user)).toBe(true);
    });
    test('returns false if user does not have admin permissions', () => {
        const user = new User(1, 1000, 'user', 'test1');
        expect(checkPermissions(user)).toBe(false);
    });
});
describe('checkBalance', () => {
    test('returns true if user has enough balance', () => {
        const user = new User(1, 100, 'admin', 'test1');
        expect(checkBalance(user, 50)).toBe(true);
    });
    test('returns false if user does not have enough balance', () => {
        const user = new User(1, 50, 'admin', 'test1');
        expect(checkBalance(user, 100)).toBe(false);
    });
});
//# sourceMappingURL=User.test.js.map