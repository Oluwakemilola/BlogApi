import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { JWT_SECRET } from "../config/env.js";

export const protect = async (req, res, next) => {
  let token;

  // 1. Check if token exists in headers
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, token missing" });
  }

  try {
    // 2. Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // 3. Attach user to request (exclude password)
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) return res.status(401).json({ message: "User not found" });

    next();
  } catch (error) {
    return res.status(401).json({ message: "Not authorized, token invalid" });
  }
};
