const { sequelize, models: { ContactInfo, Department, Staff } } = require('../database');
const { faker } = require('@faker-js/faker');

const seedData = async () => {
  try {
    await sequelize.sync({ force: true });

    // Create Departments
    const departments = [];
    for (let i = 0; i < 5; i++) {
      const department = await Department.create({
        name: faker.commerce.department(),
        description: faker.lorem.sentence(),
      });
      departments.push(department);
    }

    // Create ContactInfo and Staff
    for (let i = 0; i < 20; i++) {
      const contactInfo = await ContactInfo.create({
        email: faker.internet.email(),
        phone: faker.phone.number(),
      });

      const staff = await Staff.create({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        position: faker.name.jobTitle(),
        bio: faker.lorem.paragraph(),
        profilePicture: faker.image.avatar(),
        ContactInfoId: contactInfo.id,
        DepartmentId: departments[Math.floor(Math.random() * departments.length)].id,
      });
    }

    console.log('Seeding data completed');
  } catch (err) {
    console.error('Error seeding data:', err);
  } finally {
    await sequelize.close();
  }
};

seedData();