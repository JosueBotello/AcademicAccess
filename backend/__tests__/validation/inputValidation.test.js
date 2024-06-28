const { body, validationResult } = require('express-validator');
const { validationMiddleware } = require('../../middlewares/validationMiddleware'); // Ensure you have a middleware for validation

describe('Data Validation Tests', () => {
  test('should validate staff data correctly', async () => {
    const req = {
      body: {
        firstName: '',
        lastName: 'Doe',
        email: 'invalidemail'
      }
    };

    const res = {};
    const next = jest.fn();

    await validationMiddleware([
      body('firstName').notEmpty().withMessage('First name is required'),
      body('email').isEmail().withMessage('Email is invalid')
    ])(req, res, next);

    const errors = validationResult(req);
    expect(errors.isEmpty()).toBe(false);
  });

  // Add more validation tests...
});