const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class ContactInfo extends Model {}
  ContactInfo.init({
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    office: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'ContactInfo',
  });

  ContactInfo.associate = (models) => {
    ContactInfo.hasOne(models.Staff, { as: 'staff' });
  };

  return ContactInfo;
};