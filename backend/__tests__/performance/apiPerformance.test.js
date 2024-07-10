const supertest = require('supertest');
const { sequelize, syncDatabase, models } = require('../../database');
const { app, startServer } = require('../../server');

let server;

beforeAll(async () => {
  await syncDatabase();
  server = await startServer();
  console.log(`Test server running on port ${server.address().port}`);
});

afterAll(async () => {
  await new Promise(resolve => server.close(resolve));
  await sequelize.close();
});

describe('API Performance Tests', () => {
  it('should handle load', async () => {
    // Create test data directly in the test
    const department = await models.Department.create({
      name: 'Test Department',
      description: 'A department for testing'
    });

    const contactInfo = await models.ContactInfo.create({
      email: 'test@example.com',
      phone: '123-456-7890',
      office: 'Test Office'
    });

    await models.Staff.create({
      firstName: 'Test',
      lastName: 'User',
      position: 'Tester',
      bio: 'A test user for performance testing',
      DepartmentId: department.id,
      ContactInfoId: contactInfo.id
    });

    // Perform the API request
    const result = await supertest(app)
      .get('/staff')
      .expect(200);

    expect(result.status).toBe(200);
    expect(Array.isArray(result.body)).toBe(true);
    expect(result.body.length).toBeGreaterThan(0);

    // Optional: Clean up test data
    await models.Staff.destroy({ where: {} });
    await models.ContactInfo.destroy({ where: {} });
    await models.Department.destroy({ where: {} });
  }, 30000);
});