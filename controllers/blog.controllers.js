import Blog from "../models/blog.model.js";
import uploadToCloudinary from "../utills/upload.js";

// Admin-only: create a blog
export const postBlog = async (req, res) => {
  try {
    const {author, title, content, category, tags, published } = req.body;

    // Required field validation
    if (!author || !title || !content || !category || !tags) {
      return res.status(400).json({
        message: "All required fields must be provided"
      });
    }

    const newPost = {
      author,
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
    savedPost = await savedPost.populate("author");
     console.log(req.file);

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

// // // To Get Blogs by category

export const getBlogByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    if (!category) {
      return res.status(400).json({ message: "Category not available" });
    }

    const blogs = await Blog.find({ category: category.trim(), published: true })
      .sort({ createdAt: -1 })
      .populate('author');

    res.status(200).json({
      message: `Blogs in category: ${category}`,
      data: blogs
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

// to get by tags
export const getBlogsByTags = async (req, res) => {
  try {
    const { tags } = req.query; // use query string, e.g., ?tags=backend,tech
    if (!tags) {
      return res.status(400).json({ message: "Tags are required" });
    }

    // Split comma-separated tags and trim whitespace
    const tagsArray = tags.split(',').map(tag => tag.trim());

    // Find blogs that have at least one of the tags
    const blogs = await Blog.find({ 
      tags: { $in: tagsArray }, 
      published: true 
    })
      .sort({ createdAt: -1 })
      .populate('author', 'firstname lastname'); // optional: show author name

    res.status(200).json({
      message: `Blogs matching tags: ${tagsArray.join(', ')}`,
      data: blogs
    });

  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};


