import Blog from "../models/blog.model.js";

// POST a comment (any user can comment)
export const postComment = async (req, res) => {
  try {
    const { blogId } = req.params;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Comment content is required" });
    }

    const blog = await Blog.findById(blogId);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    // Add comment to the blog's comments array
    const newComment = {
      user: req.user.id, // must be set by your auth middleware
      content
    };

    blog.comments.push(newComment);
    await blog.save();

    // Populate user info if needed
    const populatedBlog = await blog.populate("comments.user", "email role");

    res.status(201).json({
      message: "Comment posted successfully",
      data: populatedBlog.comments
    });

  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

// GET comments for a blog
export const getComments = async (req, res) => {
  try {
    const { blogId } = req.params;

    const blog = await Blog.findById(blogId).populate("comments.user", "email role");
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    res.status(200).json({
      message: "Comments retrieved successfully",
      data: blog.comments
    });

  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};
