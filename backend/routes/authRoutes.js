const express = require('express');
const router = express.Router();
const { login, register } = require('../controllers/authController');

// Login route
router.post('/login', login);

// Registration route (for future implementation)
router.post('/register', register);

module.exports = router;