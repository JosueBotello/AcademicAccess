// jest.setup.js
const { Sequelize } = require("sequelize");

// Mock Sequelize instance for tests
jest.mock("sequelize", () => {
  const mSequelize = {
    authenticate: jest.fn(),
    define: jest.fn(),
    sync: jest.fn(),
  };
  const actualSequelize = jest.requireActual("sequelize");
  return { Sequelize: jest.fn(() => mSequelize), DataTypes: actualSequelize.DataTypes };
});

// No actual database setup needed here since we're mocking
module.exports = { sequelize: new Sequelize("sqlite::memory:", { logging: false }) };
