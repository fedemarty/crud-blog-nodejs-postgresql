// Test setup configuration
// Configure test environment for CI and local testing

// Mock DATABASE_URL for tests if not set (CI environment)
if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = 'postgres://test:test@localhost:5432/test';
}

// Set NODE_ENV to test
process.env.NODE_ENV = 'test';

// Mock the database connection to prevent actual database calls during tests
jest.mock('../db', () => ({
  sequelize: {
    authenticate: jest.fn().mockResolvedValue(undefined),
    sync: jest.fn().mockResolvedValue(undefined),
    close: jest.fn().mockResolvedValue(undefined),
  },
}));