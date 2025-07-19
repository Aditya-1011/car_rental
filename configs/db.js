import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const connectDB=async()=>{
    try{
        mongoose.connection.on('connected',()=>{
            console.log("db connected");
        })
        await mongoose.connect(`${process.env.MONGODB_URL}/car-rentall`)

    }
    catch(error){
        console.log(error.message);

    }
}
export default connectDB;