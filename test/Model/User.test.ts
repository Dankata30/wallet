// Import the necessary modules and dependencies
const { User,  checkUser,  } = require('../../src/model/User');

// Mock the req and res objects
const req = {
  username: 'john_doe',
  password: 'password123',
  current_user: null,
};

const res = {};

// Create a mock connection object with a query method
const connection = {
  query: jest.fn(),
};

describe('checkUser function', () => {
  // Test case for a successful user login
  it('should return a User object when the correct username and password are provided', async () => {
    
  });

  // Test case for an incorrect password
  it('should throw an error when an incorrect password is provided', async () => {
  
  });

  // Test case for an incorrect username
  it('should throw an error when an incorrect username is provided', async () => {
  
  });

  // Test case for a database error
  it('should throw an error when a database error occurs', async () => {

  });
});


describe('getUser function', () => {
  // Similar tests
});

// Test the rest of the functions 
