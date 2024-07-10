const request = require('supertest');
const { app } = require('../../server');
const staffController = require('../../controllers/staffController');

// Mock the entire staffController
jest.mock('../../controllers/staffController', () => ({
  getAllStaff: jest.fn(),
  getStaffById: jest.fn(),
  createStaff: jest.fn(),
  updateStaff: jest.fn(),
  deleteStaff: jest.fn(),
}));

// Mock the database module
jest.mock('../../database', () => ({
  sequelize: {
    sync: jest.fn().mockResolvedValue(),
    transaction: jest.fn(() => ({
      commit: jest.fn(),
      rollback: jest.fn(),
    })),
  },
  models: {
    Staff: {
      findAll: jest.fn(),
      findByPk: jest.fn(),
      create: jest.fn(),
    },
    ContactInfo: {
      create: jest.fn(),
    },
  },
  syncDatabase: jest.fn().mockResolvedValue(),
}));

describe('Error Handling Tests', () => {
  test('should return 404 for non-existent route', async () => {
    const response = await request(app).get('/api/nonexistent');
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Not Found' });
  });

  test('should handle internal server error', async () => {
    staffController.getAllStaff.mockImplementation((req, res) => {
      res.status(500).json({ error: 'Internal server error' });
    });

    const response = await request(app).get('/staff');
    
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Internal server error' });
  });

  test('should return 404 for non-existent staff member', async () => {
    staffController.getStaffById.mockImplementation((req, res) => {
      res.status(404).json({ error: 'Staff member not found' });
    });

    const response = await request(app).get('/staff/999');
    
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Staff member not found' });
  });

  test('should handle invalid input for creating staff', async () => {
    staffController.createStaff.mockImplementation((req, res) => {
      res.status(500).json({ error: 'Internal server error' });
    });

    const invalidStaffData = { firstName: '', lastName: '' };

    const response = await request(app)
      .post('/staff')
      .send(invalidStaffData);

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Internal server error' });
  });
});