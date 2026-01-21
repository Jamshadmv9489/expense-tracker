import express from 'express'

import { registerValidator } from '../validators/registerValidator.js';
import { validate } from '../middleware/validate.js';
import { registerUser } from '../controllers/authController.js';

const router = express.Router();

// Register new user
router.post('/register', registerValidator, validate, registerUser);


export default router;