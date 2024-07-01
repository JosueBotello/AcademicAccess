const Department = require('../models/department');

async function getAllDepartments(req, res) {
  try {
    const departments = await Department.findAll();
    res.json(departments);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getDepartmentById(req, res) {
  try {
    const department = await Department.findByPk(req.params.id);
    if (department) {
      res.json(department);
    } else {
      res.status(404).json({ error: 'Department not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function createDepartment(req, res) {
  try {
    const newDepartment = await Department.create(req.body);
    res.status(201).json(newDepartment);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function updateDepartment(req, res) {
  try {
    const [updatedRows] = await Department.update(req.body, { where: { id: req.params.id } });
    if (updatedRows) {
      const updatedDepartment = await Department.findByPk(req.params.id);
      res.json(updatedDepartment);
    } else {
      res.status(404).json({ error: 'Department not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function deleteDepartment(req, res) {
  try {
    const deletedRows = await Department.destroy({ where: { id: req.params.id } });
    if (deletedRows) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Department not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  getAllDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment
};