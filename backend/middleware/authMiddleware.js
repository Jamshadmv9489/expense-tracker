// middlewares/auth.middleware.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token)
    return res.status(401).json({ message: "Not authorized" });

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // decoded.id = userId
  req.user = await User.findById(decoded.id).select("-password");

  next();
};
