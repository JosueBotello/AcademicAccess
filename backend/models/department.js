const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Department extends Model {}
  Department.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    headOfDepartment: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Department',
  });

  Department.associate = (models) => {
    Department.hasMany(models.Staff, { foreignKey: 'departmentId', as: 'staffMembers' });
  };

  return Department;
};