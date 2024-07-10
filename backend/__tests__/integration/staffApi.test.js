const request = require('supertest');
const { app } = require('../../server');
const { models } = require('../../database');

jest.mock('../../database', () => ({
  models: {
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
    },
    Department: {},
  },
  sequelize: {
    transaction: jest.fn(() => ({
      commit: jest.fn(),
      rollback: jest.fn(),
    })),
  },
}));

describe('Staff Routes Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('GET /staff should return all staff', async () => {
    const mockStaff = [{ id: 1, firstName: 'John', lastName: 'Doe' }];
    models.Staff.findAll.mockResolvedValue(mockStaff);

    const response = await request(app).get('/staff');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockStaff);
  });

  test('GET /staff/:id should return a specific staff member', async () => {
    const mockStaff = { id: 1, firstName: 'John', lastName: 'Doe' };
    models.Staff.findByPk.mockResolvedValue(mockStaff);

    const response = await request(app).get('/staff/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockStaff);
  });

  test('POST /staff should create a new staff member', async () => {
    const newStaff = { 
      firstName: 'Jane', 
      lastName: 'Doe',
      contactInfo: { email: 'jane@example.com' }
    };
    const createdStaff = { id: 2, ...newStaff };
    models.ContactInfo.create.mockResolvedValue({ id: 1 });
    models.Staff.create.mockResolvedValue({ id: 2 });
    models.Staff.findByPk.mockResolvedValue(createdStaff);

    const response = await request(app)
      .post('/staff')
      .send(newStaff);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(createdStaff);
  });

  test('PUT /staff/:id should update a staff member', async () => {
    const updatedStaff = { id: 1, firstName: 'Jane', lastName: 'Doe' };
    models.Staff.update.mockResolvedValue([1]);
    models.Staff.findByPk.mockResolvedValue(updatedStaff);

    const response = await request(app)
      .put('/staff/1')
      .send({ firstName: 'Jane' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(updatedStaff);
  });

  test('DELETE /staff/:id should delete a staff member', async () => {
    models.Staff.findByPk.mockResolvedValue({ id: 1, destroy: jest.fn() });

    const response = await request(app).delete('/staff/1');

    expect(response.status).toBe(204);
  });

  test('GET /staff/:id should return 404 for non-existent staff', async () => {
    models.Staff.findByPk.mockResolvedValue(null);

    const response = await request(app).get('/staff/999');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Staff member not found' });
  });

  test('PUT /staff/:id should return 404 for non-existent staff', async () => {
    models.Staff.update.mockResolvedValue([0]);

    const response = await request(app)
      .put('/staff/999')
      .send({ firstName: 'Jane' });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Staff member not found' });
  });

  test('DELETE /staff/:id should return 404 for non-existent staff', async () => {
    models.Staff.findByPk.mockResolvedValue(null);

    const response = await request(app).delete('/staff/999');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Staff member not found' });
  });
});