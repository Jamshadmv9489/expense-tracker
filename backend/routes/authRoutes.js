import express from 'express'

import { registerValidator } from '../validators/registerValidator.js';
import { loginValidator } from '../validators/loginValidator.js';
import { validate } from '../middleware/validate.js';
import { loginUser, logoutUser, registerUser } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Register new user
router.post('/register', registerValidator, validate, registerUser);

// Login user
router.post('/login', loginValidator, validate, loginUser);

// Logout user
router.post('/logout', protect, logoutUser);


export default router;