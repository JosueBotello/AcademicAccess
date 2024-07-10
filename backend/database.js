require('dotenv').config();
const { Sequelize } = require('sequelize');
const config = require('./config/config')[process.env.NODE_ENV || 'development'];

console.log('Current environment:', process.env.NODE_ENV);
console.log('Database configuration:', config);

// Check if config is correctly loaded
if (!config || !config.database) {
  throw new Error('Database configuration is undefined. Check the config file and environment variables.');
}

// Initialize Sequelize with the database configuration
const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  logging: false,
});

// Import models
const modelDefiners = [
  require('./models/contactInfo'),
  require('./models/department'),
  require('./models/staff'),
];

// Define all models according to their files.
const models = {};
modelDefiners.forEach(definer => {
  const model = definer(sequelize, Sequelize.DataTypes);
  console.log(`Defining model: ${model.name}`);
  models[model.name] = model;
});

// If a model has an associate function, call it to set the relationships
Object.values(models)
  .filter(model => typeof model.associate === 'function')
  .forEach(model => {
    console.log(`Associating model: ${model.name}`);
    model.associate(models);
  });

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
