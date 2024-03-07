import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import router from './routes/UserRoutes.js';
import cors from "cors";

dotenv.config();
const app = express();

const connectdb = async()=>{
    try{
    await mongoose.connect(process.env.MONGO_URI)
    console.log("db connected");
    }
    catch(error){
        console.log(error);
    }

}
connectdb();

app.use(cors());
app.use(express.json());
app.use("/api/v1",router);

app.listen(3000, ()=>{
    console.log("server started");
});

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});