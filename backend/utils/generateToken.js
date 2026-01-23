import jwt from "jsonwebtoken";

// Generate JWT token and store it in HTTP-only cookie
const generateToken = (res, userId) => {

  // Create JWT token with userId payload
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d", // Token valid for 7 days
  });

  // Send token as secure cookie
  res.cookie("jwt", token, {
    httpOnly: true, // Prevent access from JavaScript (XSS protection)
    secure: process.env.NODE_ENV === "production", // HTTPS only in production
    sameSite: "strict", // Protect against CSRF attacks
    maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expires in 7 days
    path: "/", // Cookie available for entire site
  });
};

export default generateToken;
