const request = require('supertest');
const app = require('../../server');

describe('Error Handling Tests', () => {
  test('should return 404 for non-existent route', async () => {
    const response = await request(app).get('/api/nonexistent');
    expect(response.status).toBe(404);
  });

  // Add more error handling tests...
});