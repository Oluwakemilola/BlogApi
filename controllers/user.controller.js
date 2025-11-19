import mongoose from "mongoose";
import User from "../models/user.model.js";
import {JWT_SECRET, JWT_EXPIRES_IN} from "../config/env.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";

export const signup = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction()
    
    try {
        //Data needed from the user
        const{firstname, lastname, email, username, phonenumber, gender, password} = req.body;
        // To allow that all fields are inputed?

        if(!firstname || !lastname || !email || !username || !phonenumber || !gender || !password) {
            return res.status(400).json({message: "All fields are required"})
        }
         // To Check for existing User
        const existingUser = await User.findOne({email}).session(session);
        if(existingUser) {
            return res.status(400).json({message: "User already Exist"})
        }

        //To compare and hash Password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt)

        // To create New User
        const newUser = await User.create([{firstname, lastname, email, username, phonenumber, gender, password:hashPassword, role: 'user'}], {session})
        await session.commitTransaction();
        session.endSession()
        return res.status(201).json({message: "user created successfully",
            user: {
                id: newUser[0]._id,
                firstname: newUser[0].firstname,
                lastname: newUser[0].lastname,
                email: newUser[0].email,
                username: newUser[0].username,
                phonenumber: newUser[0].phonenumber,
                gender: newUser[0].gender,
                role : newUser[0].role
            }
        })

    } catch (error) {
        await session.abortTransaction()
        session.endSession();
        return res.status(500).json({
            message:"something went wrong",
        error:error.message})
    }
}


export const signin = async (req, res, next) => {
    try {
        const{username, password} = req.body;

        if(!username || !password) {
            return res.status(400).json({message: "All fields are required"})
        }

        const user = await User.findOne({username})
        if(!user) {
            return res.status(400).json({message:"Username not found"})
        }

        //To compare password
        const isPasswordValid = await bcrypt.compare(password, User.password)
        if(!isPasswordValid) {
            return res.status(400).json({message:"mismatch password"})
        }

        const token = jwt.sign({id: User.id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN})
        res.status(200).json({
            success: true,
            token: token,
            message: 'Signin Successful',
            data:  {
                id: User._id,
                firstname: User.firstname,
                lastname: User.lastname,
                email: User.email,
                username: User.username,
                phonenumber: User.phonenumber,
                gender: User.gender,
                role: User.role
            }
        })

    

    } catch (error) {
        return res.status(500).json({
            message:"something went wrong",
        error:error.message})
    }
}