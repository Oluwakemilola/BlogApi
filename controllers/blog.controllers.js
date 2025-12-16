import Blog from "../models/blog.model.js";
import uploadToCloudinary from "../utills/upload.js";

// Admin-only: create a blog
export const postBlog = async (req, res) => {
  try {
    const { title, content, category, tags, published } = req.body;

    // Required field validation
    if (!title || !content || !category || !tags) {
      return res.status(400).json({
        message: "All required fields must be provided"
      });
    }

    const newPost = {
      author: req.user._id, // Secure: use logged-in user as author
      title,
      content,
      category,
      tags: Array.isArray(tags)
        ? tags
        : tags.split(",").map(tag => tag.trim()),
      published: Boolean(published)
    };

    // Image upload
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      newPost.image = {
        url: result.secure_url,
        publicId: result.public_id
      };
    }

    let savedPost = await Blog.create(newPost);

    // Populate author name, username
    savedPost = await savedPost.populate("author", "firstname lastname username");

    return res.status(201).json({
      message: "Blog created successfully",
      data: savedPost
    });

  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message
    });
  }
};

// // // To Get Blogs

// export const allBlog = async (req, res, next) =>{
//   try {
//     const Blogs = await Blog.find()
//     return res.status(200).json({message:"All blogs fectched successfully",
//       data: Blogs
//     })
//   } catch (error) {
//   return res.status(500).json({
//     message:"something went wrong",
//     error: error.message
//   })
    
//   }
// }

// // TO Patch

// export const editBlog = async (req, res) => {
//   try {
//     const {body, title} = req.body
//     const edit = await Blog.findOneAndUpdate(body, title)
//     return res.status(200).json({
//       message:"blog successfully edited",
//       data: edit
//     })
//   } catch (error) {
//     return res.status(500).json({message:"something went wrong",
//       error: error.message
//     })
//   }
// }



// export const deleteBlog = async (req, res, next) => {
//   try {
//     const{id} = req.params;

//     const deletedBlog = await Blog.findOneAndDelete({author: req.user._id})

//     if(!deletedBlog) {
//       return res.status(400).json({message:"Blog not found"})
//     }
//     res.status(200).json({message:"Blog deleted Successfully"})
//   } catch (error) {
//     res.status(500).json({message:"something went wrong"})
//   }
// }


