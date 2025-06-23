import { model, Schema } from "mongoose";
import { Books } from "../interfaces/book_interfaces";

export const BookModel=new Schema<Books>({
    title:{
        type:String,
        required:true
    },
    author:{
         type:String,
        required:true 
    },
    genre:{
      type:String,
      required:true,
      enum:{
        values:["FICTION","NON_FICTION", "SCIENCE" , "HISTORY", "BIOGRAPHY", "FANTASY"],
        message:"Genre must be a correct input"
      }  
    },
    isbn:{
        type:String,
        required:true   
    },
    description:{
        type:String 
    },
    copies:{
        type:Number,
        required:true,
         min:[0,"Copies must be a positive number"]
    },
    available:{
        type:Boolean,
       default:true
    }
},{
    versionKey:false,
    timestamps:true
}
)

export const Book=model<Books>("Book",BookModel)