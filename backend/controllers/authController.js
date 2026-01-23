import bcrypt from "bcryptjs";
import crypto from "crypto"

import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import generateResetToken from "../utils/generateResetToken.js";
import sendEmail from "../utils/sendMailer.js";

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

// Forgot Password
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email);
    

    const user = await User.findOne({ email });

    // Same response for security
    if (!user) {
      return res.status(200).json({
        message: "If email exists, reset link sent"
      });
    }

    const { resetToken, hashedToken, expires } = generateResetToken();

    user.passwordResetToken = hashedToken;
    user.passwordResetExpires = expires;
    await user.save({ validateBeforeSave: false });

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    try {
      await sendEmail({
        to: user.email,
        subject: "Password Reset",
        text: `Reset your password: ${resetUrl}`
      });

      return res.status(200).json({
        success:true,
        message: "If email exists, reset link sent"
      });

    } catch (emailError) {
      // ❗ Rollback token if email fails
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });

      throw emailError;
    }

  } catch (error) {
    console.error("Forgot Password Error:", error);

    return res.status(500).json({
      message: "Something went wrong. Try again later"
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword, confirmPassword } = req.body;

    // 1️⃣ Basic validation
    if (!token || !newPassword || !confirmPassword) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match"
      });
    }

    // 2️⃣ Hash incoming token
    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    // 3️⃣ Find valid user
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        message: "Token is invalid or expired"
      });
    }

    // 4️⃣ Hash new password
    user.password = newPassword;

    // 5️⃣ Invalidate reset token
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    res.status(200).json({
      message: "Password reset successful"
    });

  } catch (error) {
    console.error("Reset Password Error:", error);

    res.status(500).json({
      message: "Something went wrong. Try again later"
    });
  }
};

