const { models } = require('../database');
const { Department } = models;

async function getAllDepartments(req, res) {
  try {
    console.log('Fetching all departments');
    const departments = await Department.findAll();
    console.log('Departments fetched:', departments);
    res.json(departments);
  } catch (error) {
    console.error('Error fetching all departments:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getDepartmentById(req, res) {
  try {
    console.log('Fetching department by id:', req.params.id);
    const department = await Department.findByPk(req.params.id);
    console.log('Department fetched:', department);
    if (department) {
      res.json(department);
    } else {
      res.status(404).json({ error: 'Department not found' });
    }
  } catch (error) {
    console.error('Error fetching department by id:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function createDepartment(req, res) {
  try {
    console.log('Creating new department:', req.body);
    const newDepartment = await Department.create(req.body);
    console.log('New department created:', newDepartment);
    res.status(201).json(newDepartment);
  } catch (error) {
    console.error('Error creating department:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function updateDepartment(req, res) {
  try {
    console.log('Updating department:', req.params.id, req.body);
    const [updatedRows] = await Department.update(req.body, { where: { id: req.params.id } });
    console.log('Rows updated:', updatedRows);
    if (updatedRows) {
      const updatedDepartment = await Department.findByPk(req.params.id);
      console.log('Updated department:', updatedDepartment);
      res.json(updatedDepartment);
    } else {
      res.status(404).json({ error: 'Department not found' });
    }
  } catch (error) {
    console.error('Error updating department:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function deleteDepartment(req, res) {
  try {
    console.log('Deleting department:', req.params.id);
    const deletedRows = await Department.destroy({ where: { id: req.params.id } });
    console.log('Rows deleted:', deletedRows);
    if (deletedRows) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Department not found' });
    }
  } catch (error) {
    console.error('Error deleting department:', error);
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