import express from "express"
import dotenv from "dotenv"
import connectDB from "./database/db.js"
import userRoute from "./routes/user.route.js"
import cors from "cors"
import cookieParser from "cookie-parser"



dotenv.config()
const app = express()


const PORT = process.env.PORT || 3000



//default middleware
app.use(express.json());
app.use(cookieParser())
// app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))


//api's
app.use("/api/v1/user", userRoute)

// "http://localhost:8000/api/v1/user/register"

app.listen(PORT, ()=>{
    console.log(`Server listen at port ${PORT}`);
    connectDB()
})