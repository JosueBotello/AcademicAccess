require('dotenv').config(); // Load environment variables from .env file
const { Sequelize } = require('sequelize');
const config = require('./config/config')[process.env.NODE_ENV || 'development']; // Use environment-based config

// Initialize Sequelize with the database configuration
const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: 'postgres',
  logging: false, // Set to console.log to see the SQL queries
});

// Import models
const ContactInfo = require('./models/contactInfo')(sequelize, Sequelize);
const Department = require('./models/department')(sequelize, Sequelize);
const Staff = require('./models/staff')(sequelize, Sequelize);

// Set up associations
ContactInfo.hasMany(Staff, { onDelete: 'SET NULL', onUpdate: 'CASCADE' });
Staff.belongsTo(ContactInfo, { onDelete: 'SET NULL', onUpdate: 'CASCADE' });

Department.hasMany(Staff, { onDelete: 'SET NULL', onUpdate: 'CASCADE' });
Staff.belongsTo(Department, { onDelete: 'SET NULL', onUpdate: 'CASCADE' });

// Test database connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

// Sync database models in the correct order
const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Database synced');
  } catch (error) {
    console.error('Unable to sync database:', error);
  }
};

module.exports = { sequelize, testConnection, syncDatabase, models: { ContactInfo, Department, Staff } };