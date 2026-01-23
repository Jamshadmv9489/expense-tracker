import express from 'express'

import { registerValidator } from '../validators/registerValidator.js';
import { loginValidator } from '../validators/loginValidator.js';
import { validate } from '../middleware/validate.js';
import { forgotPassword, loginUser, logoutUser, registerUser, resetPassword } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import { forgotPasswordValidator, resetPasswordValidator } from '../validators/forgotValidator.js';

const router = express.Router();

// Register new user
router.post('/register', registerValidator, validate, registerUser);

// Login user
router.post('/login', loginValidator, validate, loginUser);

// Logout user
router.post('/logout', protect, logoutUser);

// Forgot Password
router.post('/forgot-password', forgotPasswordValidator, validate, forgotPassword);

// Reset Password
router.post('/reset-password', resetPasswordValidator, validate, resetPassword);

export default router;