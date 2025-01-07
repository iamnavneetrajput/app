import express from 'express';
import { registerUser, loginUser, toggleUserBlock, updateUserProfile } from '../controllers/authController.js';

const router = express.Router();

// User registration route
router.post('/register', registerUser);

// User login route
router.post('/login', loginUser);

// Toggle block status route
router.patch('/block/:userId', toggleUserBlock);

// Update user profile route
router.patch('/profile/:userId', updateUserProfile);

export default router;
