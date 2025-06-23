import mongoose from "mongoose";
import app from "./app";
import dotenv from "dotenv"
let server;
const PORT=6000 
dotenv.config()
const bootstrap=async()=>{
    try{
     await mongoose.connect(`mongodb+srv://${process.env.DATABASE_USER}:${process.env.PASSWORD}@cluster0.tfmo3.mongodb.net/book-management?retryWrites=true&w=majority&appName=Cluster0`)
 console.log('sucessfully connected with mongodb')
 server= app.listen(PORT,()=>{
    console.log(`server is listening the port ${PORT}`)
 })    
    }
  catch(error){
    console.log(error)
  }
  
}
bootstrap()
