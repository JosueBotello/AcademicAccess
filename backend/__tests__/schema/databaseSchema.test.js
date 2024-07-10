const { Sequelize } = require('sequelize');
const config = require('../../config/config');
const StaffModel = require('../../models/staff');
const DepartmentModel = require('../../models/department');
const ContactInfoModel = require('../../models/contactInfo');

let sequelize;
let Staff;
let Department;
let ContactInfo;

beforeAll(async () => {
  console.log('Test configuration:', config.test);

  try {
    sequelize = new Sequelize(config.test.database, config.test.username, config.test.password, {
      host: config.test.host,
      dialect: config.test.dialect,
      logging: false,
    });

    console.log('Sequelize instance created');
    console.log('Full Sequelize config:', sequelize.config);

    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');

    Staff = StaffModel(sequelize);
    Department = DepartmentModel(sequelize);
    ContactInfo = ContactInfoModel(sequelize);

    console.log('Models initialized');

    // Explicitly call associate methods
    Staff.associate({ Department, ContactInfo });
    Department.associate({ Staff });
    ContactInfo.associate({ Staff });

    console.log('Model associations established');

    await sequelize.sync({ force: true });
    console.log('Database synced');
  } catch (error) {
    console.error('Unable to set up the database:', error);
    throw error;
  }
});

afterAll(async () => {
  if (sequelize) {
    await sequelize.close();
    console.log('Database connection closed');
  }
});

describe('Database Schema Tests', () => {
  test('Staff table should have correct columns', () => {
    expect(Staff).toBeDefined();
    const staffColumns = Object.keys(Staff.rawAttributes);
    expect(staffColumns).toEqual(expect.arrayContaining([
      'id', 'firstName', 'lastName', 'position', 'bio', 'profilePicture', 
      'departmentId', 'contactInfoId', 'createdAt', 'updatedAt'
    ]));
  });

  test('Department table should have correct columns', () => {
    expect(Department).toBeDefined();
    const departmentColumns = Object.keys(Department.rawAttributes);
    expect(departmentColumns).toEqual(expect.arrayContaining([
      'id', 'name', 'description', 'headOfDepartment', 'createdAt', 'updatedAt'
    ]));
  });

  test('ContactInfo table should have correct columns', () => {
    expect(ContactInfo).toBeDefined();
    const contactInfoColumns = Object.keys(ContactInfo.rawAttributes);
    expect(contactInfoColumns).toEqual(expect.arrayContaining([
      'id', 'email', 'phone', 'office', 'createdAt', 'updatedAt'
    ]));
  });

  test('Staff should have a relation to Department', () => {
    expect(Staff.associations).toBeDefined();
    const departmentAssociation = Staff.associations.department;
    expect(departmentAssociation).toBeDefined();
    expect(departmentAssociation.associationType).toBe('BelongsTo');
  });

  test('Staff should have a relation to ContactInfo', () => {
    expect(Staff.associations).toBeDefined();
    const contactInfoAssociation = Staff.associations.contactInfo;
    expect(contactInfoAssociation).toBeDefined();
    expect(contactInfoAssociation.associationType).toBe('BelongsTo');
  });

  test('Department should have many Staff', () => {
    expect(Department.associations).toBeDefined();
    const staffAssociation = Department.associations.staffMembers;
    expect(staffAssociation).toBeDefined();
    expect(staffAssociation.associationType).toBe('HasMany');
  });

  test('ContactInfo should have one Staff', () => {
    expect(ContactInfo.associations).toBeDefined();
    const staffAssociation = ContactInfo.associations.staff;
    expect(staffAssociation).toBeDefined();
    expect(staffAssociation.associationType).toBe('HasOne');
  });
});