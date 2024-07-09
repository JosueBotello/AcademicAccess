const request = require('supertest');
const app = require('../../server');
const { models } = require('../../database');

jest.mock('../../database', () => ({
  models: {
    Department: {
      findAll: jest.fn(),
      findByPk: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      destroy: jest.fn(),
    },
  },
}));

describe('Department Routes Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('GET /departments should return all departments', async () => {
    const mockDepartments = [
      { id: 1, name: 'Economics' },
      { id: 2, name: 'Computer Science' }
    ];
    models.Department.findAll.mockResolvedValue(mockDepartments);

    const response = await request(app).get('/departments');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockDepartments);
  });

  test('GET /departments/:id should return a specific department', async () => {
    const mockDepartment = { id: 1, name: 'Economics' };
    models.Department.findByPk.mockResolvedValue(mockDepartment);

    const response = await request(app).get('/departments/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockDepartment);
  });

  test('GET /departments/:id should return 404 for non-existent department', async () => {
    models.Department.findByPk.mockResolvedValue(null);

    const response = await request(app).get('/departments/999');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Department not found' });
  });

  test('POST /departments should create a new department', async () => {
    const newDepartment = { name: 'New Department', description: 'Test description' };
    const createdDepartment = { id: 1, ...newDepartment };
    models.Department.create.mockResolvedValue(createdDepartment);

    const response = await request(app)
      .post('/departments')
      .send(newDepartment);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(createdDepartment);
  });

  test('PUT /departments/:id should update a department', async () => {
    const updatedDepartment = { name: 'Updated Department' };
    models.Department.update.mockResolvedValue([1]);
    models.Department.findByPk.mockResolvedValue({ id: 1, ...updatedDepartment });

    const response = await request(app)
      .put('/departments/1')
      .send(updatedDepartment);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: 1, ...updatedDepartment });
  });

  test('DELETE /departments/:id should delete a department', async () => {
    models.Department.destroy.mockResolvedValue(1);

    const response = await request(app).delete('/departments/1');

    expect(response.status).toBe(204);
  });
});