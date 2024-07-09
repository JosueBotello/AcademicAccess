// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { syncDatabase } = require('./database');
const staffRoutes = require('./routes/staffRoutes');
const departmentRoutes = require('./routes/departmentRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/staff', staffRoutes);
app.use('/departments', departmentRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to AcademicAccess API' });
});

// Handle 404 errors
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// Export the app before syncing the database
module.exports = app;

// Only sync and start the server if this file is run directly
if (require.main === module) {
  syncDatabase()
    .then(() => {
      const server = app.listen(port, () => {
        console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
      });
      return server;
    })
    .catch(err => {
      console.error('Unable to sync database:', err);
    });
}

module.exports = app;