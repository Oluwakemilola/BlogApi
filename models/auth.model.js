import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        required: [true, "Please enter your email"] ,
        unique: true,
        trim: true,
        match: [/\S+@\S+\S.\S+/, "Invalid Email"]
    },
    username: {
        type: String,
        required:true,
        trim: true,
        unique: true
    },
    phonenumber: {
        type: String,
        required: true,
        match: [/^\+?[1-9]\d{1,14}$/, "Invalid Phonenumber"],
        unique:true
    },
    gender: {
        type: String,
        required: true,
        enum: ["female", "male"]
    },
    
    password: {
        type: String,
        required: true,
        trim: true,
    },
    role: {
        type: String,
        enum: [
            'user',
            'admin'
        ],
        default: 'user',
    }
},
{
    timestamps: true
})

const Auth = mongoose.model("Auth", authSchema)
export default Auth