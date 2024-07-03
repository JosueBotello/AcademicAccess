const {
  getAllDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} = require("../../controllers/departmentController");
const Department = require("../../models/department");

// Mock the Department model
jest.mock("../../models/department", () => ({
  findAll: jest.fn(),
  findByPk: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  destroy: jest.fn(),
}));

describe("Department Controller Unit Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should fetch all departments", async () => {
    // Arrange
    const mockDepartments = [{ id: 1, name: "Economics" }];
    Department.findAll.mockResolvedValue(mockDepartments);

    const req = {};
    const res = {
      json: jest.fn(),
    };

    // Act
    await getAllDepartments(req, res);

    // Assert
    expect(Department.findAll).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(mockDepartments);
  });

  // Add more unit tests for other methods...
});