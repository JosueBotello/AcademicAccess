require('dotenv').config(); // Load environment variables from .env file
const { Sequelize } = require('sequelize');
const config = require('./config/config')[process.env.NODE_ENV || 'development'];

// Initialize Sequelize with the database configuration
const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: 'postgres',
  logging: false, // Set to console.log to see the SQL queries
});

// Import models
const modelDefiners = [
  require('./models/contactInfo'),
  require('./models/department'),
  require('./models/staff'),
];

// Define all models according to their files.
const models = Object.fromEntries(
  modelDefiners.map(definer => {
    const model = definer(sequelize, Sequelize.DataTypes);
    return model ? [model.name, model] : [];
  }).filter(model => model.length > 0)
);

// If a model has an associate function, call it to set the relationships
Object.values(models)
  .filter(model => typeof model.associate === 'function')
  .forEach(model => model.associate(models));

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

module.exports = { sequelize, testConnection, syncDatabase, models };