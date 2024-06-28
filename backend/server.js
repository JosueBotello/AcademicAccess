const express = require('express');
const cors = require('cors');
const { sequelize } = require('./database');
const staffRoutes = require('./routes/staffRoutes');
const departmentRoutes = require('./routes/departmentRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/staff', staffRoutes);
app.use('/api/departments', departmentRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to AcademicAccess API' });
});

sequelize.sync({ force: false })
  .then(() => {
    console.log('Database synced');
    app.listen(port, () => {
      console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
    });
  })
  .catch(err => {
    console.error('Unable to sync database:', err);
  });

module.exports = app; // For testing purposes