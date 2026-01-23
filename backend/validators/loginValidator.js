import { body } from "express-validator";

// Login request validation
export const loginValidator = [
  // Validate email
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .bail() // stop validation chain if empty
    .isEmail()
    .withMessage("Invalid email address")
    .normalizeEmail(),

  // Validate password
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];
