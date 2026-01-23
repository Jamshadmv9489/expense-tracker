import { validationResult } from "express-validator";

// Validattion Errors Result
export const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array().map(err => err.msg),
    });
  }

  next();
};
