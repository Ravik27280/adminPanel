// Example integration with authMiddleware and roleMiddleware in routes

const express = require('express');
const router = express.Router();
const { authMiddleware, roleMiddleware } = require('../middlewares/authMiddleware');
const userController = require('../controller/userController');


// Protected routes with authentication middleware
router.get('/', authMiddleware, userController.getAllUsers);
router.get('/:userId', authMiddleware, userController.getUserById);
router.put('/:id', authMiddleware, userController.updateUser);
router.delete('/:id', authMiddleware, userController.deleteUser);

module.exports = router;
