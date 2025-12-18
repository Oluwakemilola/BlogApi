import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, "Invalid Email"]
    },
    
    password: {
        type: String,
        required: true,
        trim: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, {
    timestamps: true
});

const User = mongoose.model("User", userSchema);
export default User;
