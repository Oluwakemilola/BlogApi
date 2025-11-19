import { Router } from "express";
import {postBlog, 
       allBlog, 
       updateBlog, 
       editBlog, 
       deleteBlog} from '../controllers/blog.controllers.js'
import { protect } from "../middleware/auth.middleware.js";
const blogRouter = Router();

blogRouter.post('/create', protect, postBlog)
blogRouter.get('/getblog', allBlog)
blogRouter.put('/updateblog/:id', protect, updateBlog)
blogRouter.patch('/editblog/:id', protect, editBlog)
blogRouter.delete('/delete/:id', protect, deleteBlog)

export default blogRouter;
