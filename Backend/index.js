import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import router from './routes/UserRoutes.js';

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

app.use(express.json());
app.use("/api/v1",router);

app.listen(3000, ()=>{
    console.log("server started");
});