const { models, sequelize } = require('../database');
const { Staff, ContactInfo, Department } = models;

exports.getAllStaff = async (req, res) => {
  try {
    const staff = await Staff.findAll({
      include: [ContactInfo, Department]
    });
    res.json(staff);
  } catch (error) {
    console.error('Error fetching all staff:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.getStaffById = async (req, res) => {
  try {
    const staff = await Staff.findByPk(req.params.id, {
      include: [ContactInfo, Department]
    });
    if (staff) {
      res.json(staff);
    } else {
      res.status(404).json({ error: 'Staff member not found' });
    }
  } catch (error) {
    console.error('Error fetching staff by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createStaff = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
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
    await transaction.rollback();
    console.error('Error creating staff:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.updateStaff = async (req, res) => {
  try {
    const { contactInfo, ...staffData } = req.body;
    const staff = await Staff.findByPk(req.params.id);
    if (staff) {
      await staff.update(staffData);
      if (contactInfo) {
        await ContactInfo.update(contactInfo, { where: { id: staff.ContactInfoId } });
      }
      const updatedStaff = await Staff.findByPk(req.params.id, {
        include: [ContactInfo, Department]
      });
      res.json(updatedStaff);
    } else {
      res.status(404).json({ error: 'Staff member not found' });
    }
  } catch (error) {
    console.error('Error updating staff:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteStaff = async (req, res) => {
  try {
    const staff = await Staff.findByPk(req.params.id);
    if (staff) {
      await ContactInfo.destroy({ where: { id: staff.ContactInfoId } });
      await staff.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Staff member not found' });
    }
  } catch (error) {
    console.error('Error deleting staff:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};