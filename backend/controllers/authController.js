import bcrypt from "bcryptjs";

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

// Login user
export const loginUser = async (req, res) => {
  try {
    // 1. Get email & password from request
    const { email, password } = req.body;

    // 2. Extra safety check (validator already handles this)
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // 3. Find user by email (include password explicitly)
    const user = await User.findOne({ email }).select("+password");

    // 4. If user not found → invalid credentials
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 5. Compare entered password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 6. Generate JWT and store in HTTP-only cookie
    generateToken(res, user._id);

    // 7. Send success response (no sensitive data)
    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    // Handle server errors
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Logout user
export const logoutUser = (req, res) => {
  try {
    // Clear JWT cookie from browser
    res.cookie("jwt", "", {
      httpOnly: true,                         // JS access illa
      expires: new Date(0),                   // immediately expire cookie
      secure: process.env.NODE_ENV === "production", // HTTPS only in prod
      sameSite: "strict",                     // CSRF protection
    });

    // Send success response
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });

  } catch (error) {
    // Handle server errors
    console.error("Logout error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
