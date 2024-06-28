const request = require('supertest');
const app = require('../../server');
const Department = require('../../models/department');

jest.mock('../../models/department');

describe('Department Routes Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('GET /api/departments should return all departments', async () => {
    const mockDepartments = [
      { id: 1, name: 'Economics' },
      { id: 2, name: 'Computer Science' }
    ];
    Department.findAll.mockResolvedValue(mockDepartments);

    const response = await request(app).get('/api/departments');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockDepartments);
  });

  test('GET /api/departments/:id should return a specific department', async () => {
    const mockDepartment = { id: 1, name: 'Economics' };
    Department.findByPk.mockResolvedValue(mockDepartment);

    const response = await request(app).get('/api/departments/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockDepartment);
  });

  test('GET /api/departments/:id should return 404 for non-existent department', async () => {
    Department.findByPk.mockResolvedValue(null);

    const response = await request(app).get('/api/departments/999');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Department not found' });
  });

  test('POST /api/departments should create a new department', async () => {
    const newDepartment = { name: 'New Department', description: 'Test description' };
    const createdDepartment = { id: 1, ...newDepartment };
    Department.create.mockResolvedValue(createdDepartment);

    const response = await request(app)
      .post('/api/departments')
      .send(newDepartment);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(createdDepartment);
  });

  test('PUT /api/departments/:id should update a department', async () => {
    const updatedDepartment = { name: 'Updated Department' };
    Department.update.mockResolvedValue([1]);
    Department.findByPk.mockResolvedValue({ id: 1, ...updatedDepartment });

    const response = await request(app)
      .put('/api/departments/1')
      .send(updatedDepartment);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: 1, ...updatedDepartment });
  });

  test('DELETE /api/departments/:id should delete a department', async () => {
    Department.destroy.mockResolvedValue(1);

    const response = await request(app).delete('/api/departments/1');

    expect(response.status).toBe(204);
  });
});