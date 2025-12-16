import User from '../models/user.model.js'
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// SIGNUP
export const signup = async (req, res) => {
  try {
    const { firstname, lastname, email, username, phonenumber, gender, password } = req.body;

    if (!firstname || !lastname || !email || !username || !phonenumber || !gender || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({ firstname, lastname, email, username, phonenumber, gender, password:hashedPassword });


    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    res.status(201).json({
      message: "User created successfully",
      token,
      user: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        username: user.username,
        phonenumber: user.phonenumber,
        gender: user.gender,
        role: user.role
      }
    });

  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

// SIGNIN
export const signin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) return res.status(400).json({ message: "All fields are required" });

    const user = await User.findOne({ username }).select("+password");
    if (!user) return res.status(400).json({ message: "Username not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: "Incorrect password" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    res.status(200).json({
      message: "Signin successful",
      token,
      user: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        username: user.username,
        phonenumber: user.phonenumber,
        gender: user.gender,
        role: user.role
      }
    });

  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};
