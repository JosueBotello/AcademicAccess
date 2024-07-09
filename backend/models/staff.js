import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Staff extends Model {
    static associate(models) {
      Staff.belongsTo(models.ContactInfo, {
        foreignKey: 'ContactInfoId',
        as: 'contactInfo',
      });
      Staff.belongsTo(models.Department, {
        foreignKey: 'DepartmentId',
        as: 'department',
      });
    }
  }

  Staff.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    position: DataTypes.STRING,
    bio: DataTypes.TEXT,
    profilePicture: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Staff',
  });

  return Staff;
};