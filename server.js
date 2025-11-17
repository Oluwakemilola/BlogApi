import express from 'express';
import {PORT} from './config/env.js'
import { DB } from './database/mongodb.js';
import blogRouter from './routes/blog.route.js';
import authRouter from './routes/auth.route.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';


const app = express();
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:4000",
    credentials: false, 
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["contenty-Type", "Authorization"]
    })),

app.use(express.urlencoded({extended:true}))
app.use(express.json())

//Router to signup and signin
app.use('/api/v1', authRouter)
//Router to post blog
app.use('/api/v1', blogRouter)
//Router to get blog
app.use('/api/v1/get', blogRouter)
//path to patch, put and delete
app.use('/api/v1/ppd', blogRouter)

app.listen(PORT, ()=> {
    DB()
    console.log("server is running")
})


