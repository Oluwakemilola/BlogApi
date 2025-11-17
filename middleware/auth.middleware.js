import jwt from "jsonwebtoken";
import Auth from "../models/auth.model.js";
import {JWT_SECRET} from "../config/env.js";

//This middleaware checks if the the user is authenticated
export const protect = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.toLowerCase().startsWith('bearer')) {
            return res.status(401).json({
                message: "unauthorised: No token provided"
            })
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, JWT_SECRET)

        const user = await Auth.findById(decoded.id) ;
        if(!user) {
            return res.status(401).json({
                message:"Unauthorised: User not found"
            })
        } req.user = user
        
        next()
        

        
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized: Invalid token", error: error.message });

    }
}