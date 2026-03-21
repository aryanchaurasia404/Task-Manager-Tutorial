import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoutes from "./routes/auth.route.js"
import cookieParser from "cookie-parser"
import userRoutes from "./routes/user.route.js"
import taskRoutes from "./routes/task.route.js"

dotenv.config()
mongoose
.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("Database is connected")
})
.catch((err)=>{
    console.log(err)
})


const app = express()
//Middleware to handle cors
 app.use(
    cors({
        origin: process.env.FRONT_END_URL || "http://localhost:5173",
        methods:["GET","POST","PUT","DELETE"],
        allowedHeaders:["Content-Type", "Authorization"],

    })
 );
 
 //Middleware to handle jspn object in req body
 app.use(express.json())

 app.use(cookieParser())
app.listen(3000, () => {
    console.log("Server is running on port 3000!")
})

app.use("/api/auth",authRoutes)

app.use("/api/users",userRoutes)
app.use("/api/tasks" , taskRoutes)

app.use((err,req,res,next) => {
    const statusCode = err.statusCode || 500

    const message = err.message || "Interal Server Error"

    res.status(statusCode).json({
        success : false,
        statusCode,
        message,
    })
})

