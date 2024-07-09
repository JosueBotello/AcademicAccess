import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Department extends Model {
    static associate(models) {
      Department.hasMany(models.Staff, {
        foreignKey: 'DepartmentId',
        as: 'staff',
      });
    }
  }

  Department.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: DataTypes.TEXT,
    headOfDepartment: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Department',
  });

  return Department;
};