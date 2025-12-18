import { Router } from "express";
import {postBlog, 
      getBlogByCategory, 
      getBlogsByTags ,
      updateBlog ,
      deleteBlog 
// 
} from '../controllers/blog.controllers.js'

import {protect} from "../middlewares/auth.js"
import { authorize } from "../middlewares/authorize.js";
import upload from "../middlewares/multer.js";


const blogRouter = Router();

blogRouter.post('/create',protect, authorize("admin"), upload.single("image"), postBlog)
blogRouter.get('/getblogbycategory/:category', getBlogByCategory)
blogRouter.get("/getblogsbytags", getBlogsByTags);
blogRouter.patch('/updateblog/:id', protect, authorize("admin"), updateBlog)
blogRouter.delete('/delete/:id',protect, authorize("admin"), deleteBlog)

export default blogRouter;
