import { Router } from "express";
import { postComment, getComments } from "../controllers/comment.controller.js";
import { protect } from "../middlewares/auth.js"; // JWT middleware

const router = Router();

// Post a comment (authenticated)
router.post("/:blogId", protect, postComment);

// Get all comments for a blog
router.get("/:blogId", getComments);

export default router;
