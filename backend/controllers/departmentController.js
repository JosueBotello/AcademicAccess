const { getAllDepartments, getDepartmentById, createDepartment, updateDepartment, deleteDepartment } = require('../../controllers/departmentController');
const Department = require('../../models/department');

jest.mock('../../models/department');

describe('Department Controller Unit Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should fetch all departments', async () => {
    const mockDepartments = [{ id: 1, name: 'Economics' }, { id: 2, name: 'Computer Science' }];
    Department.findAll.mockResolvedValue(mockDepartments);

    const req = {};
    const res = {
      json: jest.fn()
    };

    await getAllDepartments(req, res);

    expect(Department.findAll).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(mockDepartments);
  });

  test('should fetch department by ID', async () => {
    const mockDepartment = { id: 1, name: 'Economics' };
    Department.findByPk.mockResolvedValue(mockDepartment);

    const req = { params: { id: 1 } };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    await getDepartmentById(req, res);

    expect(Department.findByPk).toHaveBeenCalledWith('1');
    expect(res.json).toHaveBeenCalledWith(mockDepartment);
  });

  test('should return 404 if department not found', async () => {
    Department.findByPk.mockResolvedValue(null);

    const req = { params: { id: 999 } };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    await getDepartmentById(req, res);

    expect(Department.findByPk).toHaveBeenCalledWith('999');
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Department not found' });
  });

  test('should create a new department', async () => {
    const mockDepartment = { id: 1, name: 'New Department', description: 'Test description' };
    Department.create.mockResolvedValue(mockDepartment);

    const req = { body: { name: 'New Department', description: 'Test description' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await createDepartment(req, res);

    expect(Department.create).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockDepartment);
  });

  test('should update an existing department', async () => {
    const updatedDepartment = { id: 1, name: 'Updated Department' };
    Department.update.mockResolvedValue([1]);
    Department.findByPk.mockResolvedValue(updatedDepartment);

    const req = { params: { id: 1 }, body: { name: 'Updated Department' } };
    const res = {
      json: jest.fn()
    };

    await updateDepartment(req, res);

    expect(Department.update).toHaveBeenCalledWith(req.body, { where: { id: '1' } });
    expect(Department.findByPk).toHaveBeenCalledWith('1');
    expect(res.json).toHaveBeenCalledWith(updatedDepartment);
  });

  test('should delete a department', async () => {
    Department.destroy.mockResolvedValue(1);

    const req = { params: { id: 1 } };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };

    await deleteDepartment(req, res);

    expect(Department.destroy).toHaveBeenCalledWith({ where: { id: '1' } });
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });
});