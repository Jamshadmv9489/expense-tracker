// Constants
const PASSWORD_MIN_LENGTH = 6;
const NAME_MIN_LENGTH = 2;

// Reusable validators
const isRequired = (value) => !value || !value.trim() ? true : false;
const isEmailValid = (email) => /^\S+@\S+\.\S+$/.test(email.trim());

// Login Validation
export const loginValidation = (values) => {
  const errors = {};

  const email = values.email?.trim();
  const password = values.password?.trim();

  if (isRequired(email)) {
    errors.email = "Email is required";
  } else if (!isEmailValid(email)) {
    errors.email = "Please enter a valid email address";
  }

  if (isRequired(password)) {
    errors.password = "Password is required";
  } else if (password.length < PASSWORD_MIN_LENGTH) {
    errors.password = `Password must be at least ${PASSWORD_MIN_LENGTH} characters`;
  }

  return errors;
};

// Register Validation
export const registerValidation = (values) => {
  const errors = {};

  const name = values.name?.trim();
  const email = values.email?.trim();
  const password = values.password?.trim();

  if (isRequired(name)) {
    errors.name = "Name is required";
  } else if (name.length < NAME_MIN_LENGTH) {
    errors.name = `Name must be at least ${NAME_MIN_LENGTH} characters`;
  }

  if (isRequired(email)) {
    errors.email = "Email is required";
  } else if (!isEmailValid(email)) {
    errors.email = "Please enter a valid email address";
  }

  if (isRequired(password)) {
    errors.password = "Password is required";
  } else if (password.length < PASSWORD_MIN_LENGTH) {
    errors.password = `Password must be at least ${PASSWORD_MIN_LENGTH} characters`;
  }

  return errors;
};

// Forgot Password Validation
export const forgotValidation = (values) => {
  const errors = {};
  const email = values.email?.trim();

  if (isRequired(email)) {
    errors.email = "Email is required";
  } else if (!isEmailValid(email)) {
    errors.email = "Please enter a valid email address";
  }

  return errors;
};

// Reset Password Validation
export const resetValidation = (values) => {
  const errors = {};
  const newPassword = values.newPassword?.trim();
  const confirmPassword = values.confirmPassword?.trim();

  if (!newPassword) {
    errors.newPassword = "Password is required";
  } else if (newPassword.length < 6) {
    errors.newPassword = "Password must be at least 6 characters";
  }

  if (!confirmPassword) {
    errors.confirmPassword = "Confirm your password";
  } else if (confirmPassword !== newPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};
