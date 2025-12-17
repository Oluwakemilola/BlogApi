import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        // required: true,
        trim: true
    },
    lastname: {
        type: String,
        trim: true,
        // required: true,
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, "Invalid Email"]
    },
    username: {
        type: String,
        trim: true,
        unique: true
    },
    phonenumber: {
        type: Number,
        // required: true,
        unique: true
    },
    gender: {
        type: String,
        // required: true,
        enum: ["female", "male"]
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
