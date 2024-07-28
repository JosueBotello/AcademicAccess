const express = require('express');
const cors = require('cors');
const { sequelize, testConnection, syncDatabase } = require('./database');
const authRoutes = require('./routes/authRoutes');
const staffRoutes = require('./routes/staffRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const profileRoutes = require('./routes/profileRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies

// Routes
app.use('/auth', authRoutes);
app.use('/staff', staffRoutes);
app.use('/departments', departmentRoutes);
app.use('/profiles', profileRoutes); // Add the new profile routes

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
    console.log('Database setup completed successfully');
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

startServer();

module.exports = { app, startServer };