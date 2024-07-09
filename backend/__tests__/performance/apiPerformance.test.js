const autocannon = require('autocannon');
const { promisify } = require('util');
const app = require('../../server');

const autocannonAsync = promisify(autocannon);

let server;

beforeAll((done) => {
  server = app.listen(0, () => {
    console.log(`Test server running on port ${server.address().port}`);
    done();
  });
});

afterAll((done) => {
  server.close(done);
});

describe('API Performance Tests', () => {
  test('should handle load', async () => {
    const result = await autocannonAsync({
      url: `http://localhost:${server.address().port}/staff`,
      connections: 10,
      duration: 5
    });

    console.log(result);
    expect(result.errors).toBe(0);
    expect(result.timeouts).toBe(0);
    expect(result['2xx']).toBeGreaterThan(0);
    expect(result.non2xx).toBe(0);
  }, 30000);
});