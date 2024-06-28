const { getAllDepartments, getDepartmentById, createDepartment, updateDepartment, deleteDepartment } = require('../../controllers/departmentController');
const Department = require('../../models/department');

jest.mock('../../models/department');

describe('Department Controller Unit Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should fetch all departments', async () => {
    const mockDepartments = [{ id: 1, name: 'Economics' }];
    Department.findAll.mockResolvedValue(mockDepartments);

    const req = {};
    const res = {
      json: jest.fn()
    };

    await getAllDepartments(req, res);

    expect(Department.findAll).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(mockDepartments);
  });

  // Add more unit tests for other methods...
});