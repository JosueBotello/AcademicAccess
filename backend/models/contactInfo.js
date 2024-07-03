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

  ContactInfo.associate = (models) => {
    ContactInfo.hasOne(models.Staff, {
      foreignKey: 'ContactInfoId',
      as: 'staff',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    });
  };

  return ContactInfo;
};