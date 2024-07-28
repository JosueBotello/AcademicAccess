const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Profile extends Model {}

  Profile.init({
    // Unique identifier for the profile
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // Name of the staff member
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Professional title of the staff member
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Department or faculty the staff member belongs to
    department: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Contact phone number
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Contact email address
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    // Brief description or biography
    about: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    // Courses taught by the staff member
    courses: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Profile',
    timestamps: true, // Adds createdAt and updatedAt fields
  });

  return Profile;
};