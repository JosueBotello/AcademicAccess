const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffController');
const { authenticateToken, authorizeRole } = require('../middlewares/authMiddleware');

// Public route - anyone can access
router.get('/', staffController.getAllStaff);

// Protected routes - only authenticated users can access
router.get('/:id', authenticateToken, staffController.getStaffById);

// Protected routes - only academic staff and admins can access
router.put('/:id', authenticateToken, authorizeRole(['academic_staff', 'admin']), staffController.updateStaff);

// Protected routes - only admins can access
router.post('/', authenticateToken, authorizeRole(['admin']), staffController.createStaff);
router.delete('/:id', authenticateToken, authorizeRole(['admin']), staffController.deleteStaff);

module.exports = router;