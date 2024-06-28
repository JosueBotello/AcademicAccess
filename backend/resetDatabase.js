const sequelize = require('./database');
const Staff = require('./models/staff');
const ContactInfo = require('./models/contactInfo');
const Department = require('./models/department');

async function resetDatabase() {
  try {
    // Force sync all models
    await sequelize.sync({ force: true });
    console.log('Database reset successful');
  } catch (error) {
    console.error('Error resetting database:', error);
  } finally {
    await sequelize.close();
  }
}

resetDatabase();