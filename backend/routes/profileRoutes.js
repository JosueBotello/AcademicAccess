const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const { authenticateToken, authorizeRole } = require('../middlewares/authMiddleware');

// Get all profiles - accessible to all authenticated users
router.get('/', authenticateToken, profileController.getAllProfiles);

// Get a single profile by ID - accessible to all authenticated users
router.get('/:id', authenticateToken, profileController.getProfileById);

// Create a new profile - accessible only to admins
router.post('/', authenticateToken, authorizeRole(['admin']), profileController.createProfile);

// Update a profile - accessible only to admins
router.put('/:id', authenticateToken, authorizeRole(['admin']), profileController.updateProfile);

// Delete a profile - accessible only to admins
router.delete('/:id', authenticateToken, authorizeRole(['admin']), profileController.deleteProfile);

module.exports = router;