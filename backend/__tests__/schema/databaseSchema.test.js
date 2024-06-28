const { sequelize, Staff, Department, ContactInfo } = require('../../database');

describe('Database Schema Tests', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  test('Staff table should have correct columns', async () => {
    const staffColumns = Object.keys(Staff.rawAttributes);
    expect(staffColumns).toEqual(expect.arrayContaining([
      'id', 'firstName', 'lastName', 'position', 'bio', 'profilePicture', 
      'ContactInfoId', 'DepartmentId'
    ]));
  });

  test('Department table should have correct columns', async () => {
    const departmentColumns = Object.keys(Department.rawAttributes);
    expect(departmentColumns).toEqual(expect.arrayContaining([
      'id', 'name', 'description', 'headOfDepartment'
    ]));
  });

  test('ContactInfo table should have correct columns', async () => {
    const contactInfoColumns = Object.keys(ContactInfo.rawAttributes);
    expect(contactInfoColumns).toEqual(expect.arrayContaining([
      'id', 'email', 'phone', 'office'
    ]));
  });

  test('Staff should have a relation to Department', () => {
    const departmentAssociation = Staff.associations.Department;
    expect(departmentAssociation).toBeDefined();
    expect(departmentAssociation.associationType).toBe('BelongsTo');
  });

  test('Staff should have a relation to ContactInfo', () => {
    const contactInfoAssociation = Staff.associations.ContactInfo;
    expect(contactInfoAssociation).toBeDefined();
    expect(contactInfoAssociation.associationType).toBe('BelongsTo');
  });

  test('Department should have many Staff', () => {
    const staffAssociation = Department.associations.Staff;
    expect(staffAssociation).toBeDefined();
    expect(staffAssociation.associationType).toBe('HasMany');
  });

  test('ContactInfo should have one Staff', () => {
    const staffAssociation = ContactInfo.associations.Staff;
    expect(staffAssociation).toBeDefined();
    expect(staffAssociation.associationType).toBe('HasOne');
  });

  afterAll(async () => {
    await sequelize.close();
  });
});