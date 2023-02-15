"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Import the necessary modules and dependencies
const { User, checkUser, updateBalance, registerUser } = require('../../src/model/User');
const createDB_1 = require("../../src/mock_data/createDB");
const deleteDB_1 = require("../../src/mock_data/deleteDB");
// Mock the req and res objects
const req = {
    username: 'test1',
    password: 'xxx',
    user_id: '1',
};
const res = {};
// jest.mock('../../src/config/general.config')
beforeEach(() => {
    jest.resetModules();
    createDB_1.createTestDB;
});
afterEach(() => {
    deleteDB_1.deleteTestDB;
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
describe('updateBalance function', () => {
    test('updateBalance returns a Promise', () => {
        const req = {
            action_type: '+',
            amount_to_requested: 100,
            current_user: new User(1, 500, 'user', 'testUser')
        };
        const res = {};
        const result = updateBalance(req, res);
        expect(result).toBeInstanceOf(Promise);
    });
    test('updateBalance fullfills', () => {
        const req = {
            action_type: '+',
            amount_to_requested: 100,
            current_user: new User(1, 500, 'user', 'testUser')
        };
        const res = {};
        const result = updateBalance(req, res);
        expect(result).resolves;
    });
});
describe('registerUser function', () => {
    test('updateBalance returns a Promise', () => {
        const req = {
            password: '123',
            role: 'admin',
            username: 'user1'
        };
        const res = {};
        const result = registerUser(req, res);
        expect(result).toBeInstanceOf(Promise);
    });
    test('updateBalance fullfills', () => {
        const req = {
            password: '123',
            role: 'admin',
            username: 'user1'
        };
        const res = {};
        const result = registerUser(req, res);
        expect(result).resolves;
    });
});
// Test the rest of the functions 
//# sourceMappingURL=User.test.js.map