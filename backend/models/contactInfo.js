import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class ContactInfo extends Model {
    static associate(models) {
      ContactInfo.hasOne(models.Staff, {
        foreignKey: 'ContactInfoId',
        as: 'staff',
      });
    }
  }

  ContactInfo.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phone: DataTypes.STRING,
    office: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'ContactInfo',
  });

  return ContactInfo;
};