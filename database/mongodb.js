import mongoose from "mongoose";
import { DB_URL } from "../config/env.js";

export const DB = async () => {
    try {
        await mongoose.connect(`${DB_URL}`)
        console.log("Database connected");
        
    } catch (err) {
        console.log("Database not connected", err);
        
    }
}