// backend/routes/userRoutes.js
import express from 'express';
// Import all exported functions from the controller file
import * as userController from '../controllers/userController.js';

const router = express.Router();

// The logic is now in userController.getAllUsers
router.get('/', userController.getAllUsers);

// You can easily add more routes like this:
// router.get('/:id', userController.getUserProfile);

export default router;