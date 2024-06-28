const { Sequelize } = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('./config/config.js')[env];

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  logging: false // Set to console.log to see SQL queries in console
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConnection();

const Staff = require('./models/staff')(sequelize, Sequelize.DataTypes);
const Department = require('./models/department')(sequelize, Sequelize.DataTypes);
const ContactInfo = require('./models/contactInfo')(sequelize, Sequelize.DataTypes);

Staff.belongsTo(ContactInfo);
ContactInfo.hasOne(Staff);
Department.hasMany(Staff);
Staff.belongsTo(Department);

module.exports = {
  sequelize,
  Staff,
  Department,
  ContactInfo
};