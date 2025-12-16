import { Router } from "express";
import {postBlog, 
       // allBlog, 
       // updateBlog, 
       // editBlog, 
//  deleteBlog 
// 
} from '../controllers/blog.controllers.js'

import {protect} from "../middlewares/auth.js"
import { authorize } from "../middlewares/authorize.js";
import multer from "multer";
import upload from "../middlewares/multer.js";


const blogRouter = Router();

blogRouter.post('/create',protect, authorize("admin"), upload.single("image"), postBlog)
// blogRouter.get('/getblog', allBlog)
// // blogRouter.put('/updateblog/:id', updateBlog)
// blogRouter.patch('/editblog/:id', editBlog)
// // blogRouter.delete('/delete/:id', deleteBlog)

export default blogRouter;
