import { Router } from "express";
import { postComment, getComments } from "../controllers/comment.controller.js";
import { protect } from "../middlewares/auth.js"; // JWT middleware

const CommentRouter = Router();

// Post a comment (authenticated)
CommentRouter.post("/:blogId", protect, postComment);

// Get all comments for a blog
CommentRouter.get("/:blogId", getComments);

export default CommentRouter;

