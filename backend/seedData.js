const { faker } = require('@faker-js/faker');
const Staff = require('../models/staff');
const Department = require('../models/department');
const ContactInfo = require('../models/contactInfo');
const sequelize = require('../database');

async function seedData() {
  try {
    await sequelize.sync({ force: true });

    const departments = [
      'Economics',
      'Computer Science',
      'Physics',
      'Mathematics',
      'Biology',
    ];

    for (let dept of departments) {
      await Department.create({
        name: dept,
        description: faker.lorem.paragraph(),
        headOfDepartment: faker.person.fullName(),
      });
    }

    for (let i = 0; i < 50; i++) {
      const contactInfo = await ContactInfo.create({
        email: faker.internet.email(),
        phone: faker.phone.number('+44 0 ##### ####'),
        office: `Building ${faker.location.buildingNumber()}, Room ${faker.number.int({ min: 100, max: 999 })}`,
      });

      await Staff.create({
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        position: faker.helpers.arrayElement(['Professor', 'Associate Professor', 'Assistant Professor', 'Researcher']),
        bio: faker.lorem.paragraph(),
        profilePicture: faker.image.avatar(),
        ContactInfoId: contactInfo.id,
        DepartmentId: faker.number.int({ min: 1, max: 5 }),
      });
    }

    console.log('Seed data created successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await sequelize.close();
  }
}

seedData().catch(console.error);