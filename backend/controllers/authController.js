import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

// Register new user
export const registerUser = async (req, res) => {
  try {
    // Get data from request body
    const { name, email, password } = req.body;

    // Convert email to lowercase
    const emailLower = email.toLowerCase();

    // Check if user already exists
    const userExists = await User.findOne({ email: emailLower });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user in database
    const user = await User.create({
      name,
      email: emailLower,
      password,
    });

    // Generate JWT token and set it in cookie
    generateToken(res, user._id);

    // Send response (without password)
    res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    // Handle server errors
    res.status(500).json({ message: "Server error" });
  }
};
