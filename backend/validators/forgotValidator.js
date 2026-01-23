import {body} from 'express-validator'

// Forgot Password Validation
export const forgotPasswordValidator = [
  body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .bail()
    .isEmail().withMessage("Invalid email address")
    .normalizeEmail(),
];

// Reset Password Validation
export const resetPasswordValidator = [
  body("token")
    .trim()
    .notEmpty().withMessage("Reset token is required"),

  body("newPassword")
    .trim()
    .notEmpty().withMessage("New password is required")
    .bail()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  body("confirmPassword")
    .trim()
    .notEmpty().withMessage("Confirm password is required")
    .bail()
    .custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
];