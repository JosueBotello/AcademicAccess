const { sequelize, syncDatabase } = require('../database');

const resetDatabase = async () => {
  try {
    await sequelize.drop();
    await syncDatabase();
    console.log('Database reset successful');
  } catch (error) {
    console.error('Error resetting database:', error);
  } finally {
    await sequelize.close();
  }
};

resetDatabase();