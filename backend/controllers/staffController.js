const { models, sequelize } = require('../database');
const { Staff, ContactInfo, Department } = models;

const getAllStaff = async (req, res) => {
  try {
    const staff = await Staff.findAll({
      include: [
        { model: ContactInfo, as: 'contactInfo' }, 
        { model: Department, as: 'department' } 
      ]
    });
    res.json(staff);
  } catch (error) {
    console.error('Error fetching all staff:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getStaffById = async (req, res) => {
  try {
    const staff = await Staff.findByPk(req.params.id, {
      include: [
        { model: ContactInfo, as: 'contactInfo' },
        { model: Department, as: 'department' } 
      ]
    });
    if (staff) {
      res.json(staff);
    } else {
      res.status(404).json({ error: 'Staff member not found' });
    }
  } catch (error) {
    console.error('Error fetching staff by id:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const createStaff = async (req, res) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();
    const { contactInfo, ...staffData } = req.body;
    const newContactInfo = await ContactInfo.create(contactInfo, { transaction });
    const newStaff = await Staff.create({
      ...staffData,
      ContactInfoId: newContactInfo.id
    }, { transaction });
    const createdStaff = await Staff.findByPk(newStaff.id, {
      include: [ContactInfo, Department],
      transaction
    });
    await transaction.commit();
    res.status(201).json(createdStaff);
  } catch (error) {
    if (transaction) await transaction.rollback();
    console.error('Error creating staff:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateStaff = async (req, res) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();
    const { contactInfo, ...staffData } = req.body;
    const [updatedRows] = await Staff.update(staffData, {
      where: { id: req.params.id },
      transaction
    });
    if (updatedRows) {
      if (contactInfo) {
        await ContactInfo.update(contactInfo, {
          where: { id: staffData.ContactInfoId },
          transaction
        });
      }
      const updatedStaff = await Staff.findByPk(req.params.id, {
        include: [ContactInfo, Department],
        transaction
      });
      await transaction.commit();
      res.json(updatedStaff);
    } else {
      await transaction.rollback();
      res.status(404).json({ error: 'Staff member not found' });
    }
  } catch (error) {
    if (transaction) await transaction.rollback();
    console.error('Error updating staff:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteStaff = async (req, res) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();
    const staff = await Staff.findByPk(req.params.id, { transaction });
    if (staff) {
      await staff.destroy({ transaction });
      await transaction.commit();
      res.status(204).send();
    } else {
      await transaction.rollback();
      res.status(404).json({ error: 'Staff member not found' });
    }
  } catch (error) {
    if (transaction) await transaction.rollback();
    console.error('Error deleting staff:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAllStaff,
  getStaffById,
  createStaff,
  updateStaff,
  deleteStaff
};