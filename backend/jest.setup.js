const { Sequelize } = require('sequelize');

// Mock Sequelize
jest.mock('sequelize', () => {
  const mSequelize = {
    authenticate: jest.fn(),
    define: jest.fn(() => ({
      associate: jest.fn(),
    })),
    sync: jest.fn(),
    transaction: jest.fn(() => ({
      commit: jest.fn(),
      rollback: jest.fn(),
    })),
  };
  const actualSequelize = jest.requireActual('sequelize');
  return {
    Sequelize: jest.fn(() => mSequelize),
    DataTypes: actualSequelize.DataTypes,
  };
});

// Create mock models
const mockModels = {
  Staff: {
    findAll: jest.fn(),
    findByPk: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
  },
  ContactInfo: {
    create: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
  },
  Department: {
    findAll: jest.fn(),
    findByPk: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
  },
};

// Mock database module
jest.mock('./database', () => ({
  sequelize: new (jest.requireMock('sequelize').Sequelize)(),
  models: mockModels,
}), { virtual: true });

beforeAll(async () => {
  // Setup code before all tests run
});

afterAll(async () => {
  // Cleanup code after all tests are done
});

beforeEach(() => {
  jest.clearAllMocks();
});