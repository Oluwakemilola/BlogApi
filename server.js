import express from 'express';
import {PORT} from './config/env.js'
import { DB } from './database/mongodb.js';
import blogRouter from './routes/blog.route.js';
import authRouter from './routes/auth.route.js';
import commentRouter from './routes/comment.route.js'
import cors from 'cors';
import cookieParser from 'cookie-parser';
import swaggerSetup from "./config/swagger.js";


const app = express();
app.use(cookieParser());


app.use(express.urlencoded({extended:true}))
app.use(express.json())

// Swagger API documentation
swaggerSetup(app);

//Router to signup and signin
app.use('/api/v1', authRouter)
//Router to post blog
app.use('/api/v1/blogs', blogRouter)
//Comment Router

app.use('/api/v1/comments', commentRouter)

app.listen(PORT, ()=> {
    DB()
    console.log("server is running")
})


