const express = require('express');
const { sequelize, testConnection, syncDatabase } = require('./database');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Define your routes here
app.use('/staff', require('./routes/staffRoutes'));
app.use('/departments', require('./routes/departmentRoutes'));

// 404 Error Handler
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

// General Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// Test the database connection and sync models
const setupDatabase = async () => {
  try {
    await testConnection();
    await syncDatabase();
  } catch (error) {
    console.error('Database setup failed:', error);
    process.exit(1);
  }
};

// Start the server
const startServer = async () => {
  await setupDatabase();
  return app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

module.exports = { app, startServer };