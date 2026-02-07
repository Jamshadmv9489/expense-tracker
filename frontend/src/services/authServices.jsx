import API from "./api";

// Login
export const loginUser = async (data) => {
  const response = await API.post("/auth/login", data);
  return response.data;
};


// Register
export const registerUser = async (data) => {
  const response = await API.post("/auth/register", data);
  return response.data;
};


// Forgot password
export const forgotPassword = async (data) => {
  const response = await API.post("/auth/forgot-password", data);
  return response.data;
};


// Reset password
export const resetPassword = async (data) => {
  const response = await API.post("/auth/reset-password",data);
  return response.data;
};