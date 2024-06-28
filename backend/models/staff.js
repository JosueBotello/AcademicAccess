module.exports = (sequelize, DataTypes) => {
  const Staff = sequelize.define('Staff', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    position: {
      type: DataTypes.STRING,
    },
    bio: {
      type: DataTypes.TEXT,
    },
    profilePicture: {
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'Staff'
  });

  return Staff;
};