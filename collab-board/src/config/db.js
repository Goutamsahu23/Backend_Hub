const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config()

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB connected successfully");
    }catch(err){
        console.log("Error in connecting the db")
        console.error(err.message);
        process.exit(1);
    }
}

module.exports=connectDB;