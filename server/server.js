import express from "express"
import { router } from "./router/auth.router.js";
import { contactRouter } from "./router/contact.router.js";
import { serviceRouter } from "./router/service.router.js";
import {  adminRouter} from "./router/admin.router.js";

import connectDb from "./utils/db.js";
import dotenv from "dotenv" 
import errorMiddleware from "./middleware/error.middleware.js";
import cors from "cors"



const app = express();

//To tackel CORS middleware
const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials:true,
};
app.use (cors(corsOptions));

//Its a middleware its assure that we can Use Json in our Application 
// its use to display the data content on post man 
app.use(express.json());
dotenv.config({
    path: './env'
})
connectDb()


app.use("/api/auth",router)
app.use("/api/form",contactRouter)
app.use("/api/data",serviceRouter)
app.use("/api/admin", adminRouter) //For admin route
app.use("/api/admin",adminRouter)
// app.post("/postuser", async(req,res)=>{
//     const {username, phone ,email,password}=req.body
//     const createUserss= await User.create({username,phone,email,password})
//     createUserss.save();
// })
//Error middleware
app.use(errorMiddleware)
// app.get("/",(req, res)=>{
//     res.status(200).send("Welcome to SUbh ")
// }) ;

// app.get("/register",(req, res)=>{
//     res.status(200).send("Welcome to Register My Finally  SUbh ")
// }) ;


app.listen (process.env.PORT,()=>{
    console.log(`Server is Running at  port : ${process.env.PORT} `);
    
})


