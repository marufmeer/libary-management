import  { CallbackError, model, Schema } from "mongoose";
import { BorrowI, BorrowModelType } from "../interfaces/borrow_interfaces";
import { Book } from "./book_model";

export const BorrowModel=new Schema<BorrowI,BorrowModelType>({
    book: {
     type: Schema.Types.ObjectId,
     ref:"Book",
     required:true
    },
quantity:{
    type:Number,
    min:[1,"Copies must be a positive number"],
  
},
dueDate:{
    type:Date,
    required:true
}
},{
    versionKey:false,
    timestamps:true
})

BorrowModel.pre("save",async function(next){
  
     try{
         const book=await Book.findById(this.book) 
         if(!book) {
            return next(new Error("Referenced book not found"))}
            if(this.quantity>book.copies){
               return next(new Error(`cannot borrow more book than ${book.copies} copies`)) 
            }
         next()
     }
catch(error:unknown){
  next(error as CallbackError)
}
})

BorrowModel.post("save",async function(){

    try{
      const book=await Book.findById(this.book)  
       if(!book){
        return new Error("Referenced book not found")
       }
     
       book.copies=book.copies-this.quantity
        
      await book.save()
      await Borrow.updateAvailable(book._id)
    }
  catch(error){
  console.error("fail to update book copies",error)
  }

})
BorrowModel.static("updateAvailable",async function(bookId){

try{
    const book=await Book.findById(bookId)  
       if(!book){
        return new Error("Referenced book not found")
       }
       if(book.copies===0&&book.available===true){

        book.available=false
        await book.save()
       }
}
catch(error){
    console.error("Failed to update available status",error)
}
})
export const Borrow=model<BorrowI,BorrowModelType>("Borrow",BorrowModel)