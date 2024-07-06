import mongoose from "mongoose";

 const connectDB = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL);
        // console.log(`connected to mongodb Databse ${conn.connection.host}`);
    }
    catch (error){
        console.log(`Error in mongodb4 ${error}`)
    }
}

export default connectDB;