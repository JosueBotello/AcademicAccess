const { body, validationResult } = require('express-validator');
const { validationMiddleware } = require('../../middlewares/validationMiddleware');
const express = require('express');
const request = require('supertest');

describe('Data Validation Tests', () => {
  test('should validate staff data correctly', async () => {
    const app = express();
    app.use(express.json());

    const validations = [
      body('firstName').notEmpty().withMessage('First name is required'),
      body('email').isEmail().withMessage('Email is invalid')
    ];

    app.post('/test-validation', validationMiddleware(validations), (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      res.status(200).json({ message: 'Validation passed' });
    });

    const response = await request(app)
      .post('/test-validation')
      .send({ firstName: '', email: 'invalidemail' });

    expect(response.status).toBe(400);
    expect(response.body.errors).toHaveLength(2);
    expect(response.body.errors[0].msg).toBe('First name is required');
    expect(response.body.errors[1].msg).toBe('Email is invalid');
  });

  test('should pass validation with correct data', async () => {
    const app = express();
    app.use(express.json());

    const validations = [
      body('firstName').notEmpty().withMessage('First name is required'),
      body('email').isEmail().withMessage('Email is invalid')
    ];

    app.post('/test-validation', validationMiddleware(validations), (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      res.status(200).json({ message: 'Validation passed' });
    });

    const response = await request(app)
      .post('/test-validation')
      .send({ firstName: 'John', email: 'john@example.com' });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Validation passed');
  });

  test('should validate department data correctly', async () => {
    const app = express();
    app.use(express.json());

    const validations = [
      body('name').notEmpty().withMessage('Department name is required'),
      body('description').optional().isLength({ min: 10 }).withMessage('Description must be at least 10 characters long')
    ];

    app.post('/test-department-validation', validationMiddleware(validations), (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      res.status(200).json({ message: 'Validation passed' });
    });

    const response = await request(app)
      .post('/test-department-validation')
      .send({ name: '', description: 'Short' });

    expect(response.status).toBe(400);
    expect(response.body.errors).toHaveLength(2);
    expect(response.body.errors[0].msg).toBe('Department name is required');
    expect(response.body.errors[1].msg).toBe('Description must be at least 10 characters long');
  });
});