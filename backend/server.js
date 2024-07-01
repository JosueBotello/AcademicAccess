require('dotenv').config(); // Load environment variables from .env file
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

syncDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
    });
  })
  .catch(err => {
    console.error('Unable to sync database:', err);
  });

module.exports = app;