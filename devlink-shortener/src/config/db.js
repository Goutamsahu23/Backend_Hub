import mongoose from 'mongoose';
import dontenv from 'dotenv';
dontenv.config();

const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Database connected");
    }catch(err){
        console.error(`DB connection error: ${err.message}`);
        process.exit(1);
    }
}

export default connectDB;