const request = require('supertest');
const app = require('../../server');
const Staff = require('../../models/staff');

jest.mock('../../models/staff');

describe('Staff Routes Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('GET /api/staff should return all staff', async () => {
    const mockStaff = [{ id: 1, firstName: 'John', lastName: 'Doe' }];
    Staff.findAll.mockResolvedValue(mockStaff);

    const response = await request(app).get('/api/staff');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockStaff);
  });

  // Add more integration tests...
});