const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Staff extends Model {}
  Staff.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    profilePicture: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Staff',
  });

  Staff.associate = (models) => {
    Staff.belongsTo(models.Department, { foreignKey: 'departmentId', as: 'department' });
    Staff.belongsTo(models.ContactInfo, { foreignKey: 'contactInfoId', as: 'contactInfo' });
  };

  return Staff;
};