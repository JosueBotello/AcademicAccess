module.exports = (sequelize, DataTypes) => {
  const ContactInfo = sequelize.define('ContactInfo', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING,
    },
    office: {
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'ContactInfo'
  });

  return ContactInfo;
};