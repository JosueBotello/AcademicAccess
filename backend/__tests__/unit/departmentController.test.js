const {
  getAllDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} = require("../../controllers/departmentController");

// Mock the database module
jest.mock("../../database", () => ({
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

const { models } = require("../../database");

describe("Department Controller Unit Tests", () => {
  let req, res;

  beforeEach(() => {
    req = {};
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    jest.clearAllMocks();
  });

  test("should fetch all departments", async () => {
    const mockDepartments = [{ id: 1, name: "Economics" }];
    models.Department.findAll.mockResolvedValue(mockDepartments);

    await getAllDepartments(req, res);

    expect(models.Department.findAll).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(mockDepartments);
  });

  test("should fetch a department by id", async () => {
    const mockDepartment = { id: 1, name: "Economics" };
    models.Department.findByPk.mockResolvedValue(mockDepartment);
    req.params = { id: 1 };

    await getDepartmentById(req, res);

    expect(models.Department.findByPk).toHaveBeenCalledWith(1);
    expect(res.json).toHaveBeenCalledWith(mockDepartment);
  });

  test("should return 404 for non-existent department", async () => {
    models.Department.findByPk.mockResolvedValue(null);
    req.params = { id: 999 };

    await getDepartmentById(req, res);

    expect(models.Department.findByPk).toHaveBeenCalledWith(999);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Department not found" });
  });

  test("should create a new department", async () => {
    const newDepartment = { name: "New Department", description: "Test description" };
    const createdDepartment = { id: 1, ...newDepartment };
    models.Department.create.mockResolvedValue(createdDepartment);
    req.body = newDepartment;

    await createDepartment(req, res);

    expect(models.Department.create).toHaveBeenCalledWith(newDepartment);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(createdDepartment);
  });

  test("should update a department", async () => {
    const updatedDepartment = { name: "Updated Department" };
    models.Department.update.mockResolvedValue([1]);
    models.Department.findByPk.mockResolvedValue({ id: 1, ...updatedDepartment });
    req.params = { id: 1 };
    req.body = updatedDepartment;

    await updateDepartment(req, res);

    expect(models.Department.update).toHaveBeenCalledWith(updatedDepartment, { where: { id: 1 } });
    expect(models.Department.findByPk).toHaveBeenCalledWith(1);
    expect(res.json).toHaveBeenCalledWith({ id: 1, ...updatedDepartment });
  });

  test("should return 404 when updating non-existent department", async () => {
    models.Department.update.mockResolvedValue([0]);
    req.params = { id: 999 };
    req.body = { name: "Updated Department" };

    await updateDepartment(req, res);

    expect(models.Department.update).toHaveBeenCalledWith({ name: "Updated Department" }, { where: { id: 999 } });
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Department not found" });
  });

  test("should delete a department", async () => {
    models.Department.destroy.mockResolvedValue(1);
    req.params = { id: 1 };

    await deleteDepartment(req, res);

    expect(models.Department.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.json).toHaveBeenCalled();
  });

  test("should return 404 when deleting non-existent department", async () => {
    models.Department.destroy.mockResolvedValue(0);
    req.params = { id: 999 };

    await deleteDepartment(req, res);

    expect(models.Department.destroy).toHaveBeenCalledWith({ where: { id: 999 } });
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Department not found" });
  });
});