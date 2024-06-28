const autocannon = require('autocannon');

describe('API Performance Tests', () => {
  test('should handle load', async () => {
    const result = await autocannon({
      url: 'http://localhost:3000/api/staff',
      connections: 10,
      duration: 10
    });
    expect(result).toBeDefined();
  });

  // Add more performance tests...
});