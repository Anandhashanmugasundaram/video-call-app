import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
const uri = process.env.MONGO_DB_URI

const db = async() => {
    try {
        mongoose.connection.on("connected", () => {
        console.log('db connected');
        
    })
    await mongoose.connect(uri)
    } catch (error) {
        console.log("Error in connecting mongodb",error)
    }
    

}

export { db }