
import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth", // reference to Auth Model
        required: true,
    },

    body: {
        type: String,
        required: true,
    },
    
    title: {
        type: String,
        required: true
    },
} ,
{
    timestamps:true
})

const Blog = mongoose.model("Blog", blogSchema);
export default Blog
