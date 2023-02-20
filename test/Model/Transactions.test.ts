// Test cases for transactions

const { User } = require('../../src/model/User');
const { Transaction , recordTransaction , getTransactions } = require('../../src/model/Transaction');

import { createTestDB } from '../../src/mock_data/createDB';
import { deleteTestDB } from '../../src/mock_data/deleteDB';

// Mock the req and res objects
const req = {
  action: 'deposit',
  amount_to_requested: 50,
  current_user: new User( 1 , 100, 'admin', 'xxx')
};

const res = {};

beforeAll( async ()=>{
  await createTestDB();
});

beforeEach(() => {
  jest.resetModules();
});

afterAll( () => {
  deleteTestDB();
});

describe('recordTransaction function', () => {
  // Test function is a promise
  test('should create a session for the user', async () => {
    const result = await recordTransaction(req, res);
    expect(result).toBe(true);
  });

  test('recordTransaction returns a Promise', () => {
    const result = recordTransaction(req, res);
    expect(result).toBeInstanceOf(Promise);
  });

  test('recordTransaction returns error if user does not exist', () => {
    const req = {
        action: 'deposit',
        amount_to_requested: 50,
        current_user: new User( 5 , 100, 'admin', 'xxx')
      };
    const result = recordTransaction(req, res);
    expect(result).rejects.toEqual('Database Error');
  });
});

describe('getTransactions function', () => {
    // Test function is a promise
    test('should return transactions for the user', async () => {
        const req = {
            transactions_to_show: 50,
            user_id: 1,
            transactions: []
          };

        const result = await getTransactions(req, res);
        expect(result).resolves;
        expect(req.transactions).not.toBeNull();
        expect(req.transactions.length).toBe(4);
    });

    test('should return transactions for the user', async () => {
        const req = {
            transactions_to_show: null,
            user_id: 1,
            transactions: []
          };

        const result = await getTransactions(req, res);
        expect(result).resolves;
        expect(req.transactions).not.toBeNull();
        expect(req.transactions_to_show).toBe(10);
    });
  });