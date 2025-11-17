import mongoose from "mongoose";
import Blog from "../models/blog.model.js";


export const postBlog = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const {title, body } = req.body;
    if (!req.body) {
      return res.status(400).json({ message: "Request body is missing" });
    }
    
    if (!title || !body) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    const createBlog = await Blog.create([{author: req.user._id, title, body }], {
      session
    });
  const blogWithAuthor = await Blog.findById(createBlog[0]._id)
  .populate('author', 'firstname username')
  .session(session);
    await session.commitTransaction();
    session.endSession();
    return res.status(201).json({
      message: "Blog created Successfully",
      blog: blogWithAuthor,
    });
   
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return res.status(500).json({
      message: "something went wrong",
      error: error.message,
    });
  }
};

// To Get Blogs

export const allBlog = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author", "username");
    res.status(201).json({message: "blog fetched successfully",
      data:blogs
    })
  } catch (error) {
    return res.status(500).json({message:"something went wrong",
      error: message.error
    })
  }
}

// To Edit Blog
export const updateBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, body } = req.body;

    if (!title || !body) {
      return res.status(400).json({message: "All fields are required"});
    }

    // Use findOneAndUpdate with both filters (id and author)
    const updatedBlog = await Blog.findOneAndUpdate(
      { _id: id, author: req.user._id }, // Only allow author to update
      { title, body },
      { new: true, runValidators: true }
    ).populate('author', 'firstname username');
    
    if (!updatedBlog) {
      return res.status(404).json({message: 'Blog not found or you are not the author'});
    }

    res.status(200).json({
      message: "Blog Updated Successfully",
      blog: updatedBlog
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message
    });
  }
}

//To partially update blog
export const editBlog = async (req, res, next) => {
  try {
    const {id} = req.params;

    const editedBlog = await Blog.findOneAndUpdate(
      {_id: id, author: req.user._id}, 
      req.body, {
      new: true,
      runValidators:true,
    })

    if(!editedBlog) {
      return res.status(400).json({message:"Blog not found"})
    }
    res.status(200).json({
      message:"Blog updated successfully",
    blog: editedBlog})
  } catch (error) {
    res.status(500).json({
      message:"something went wrong",
      error: error.message
    })
  }
}

export const deleteBlog = async (req, res, next) => {
  try {
    const{id} = req.params;

    const deletedBlog = await Blog.findOneAndDelete({_id: id, author: req.user._id})

    if(!deletedBlog) {
      return res.status(400).json({message:"Blog not found"})
    }
    res.status(200).json({message:"Blog deleted Successfully"})
  } catch (error) {
    res.status(500).json({message:"something went wrong"})
  }
}



