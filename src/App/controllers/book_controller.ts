import express, { Request, Response } from "express"
import { Book } from "../models/book_model"
import { bookZodSchema,bookUpdateZodSchema } from "../ZodSchema/BookZodschema"



export const  bookRoutes=express.Router()



bookRoutes.get("/",async (req:Request,res:Response) => {
  const {filter,sort,limit,sortBy}=req.query
  const parseLimit=parseInt(limit as string)
  const sortOrder=sort ==="desc"?-1:1
  if(filter||(sortOrder&&sortBy)||limit){
  const result= await Book.find({genre:filter}).sort({[sortBy as string]:sortOrder}).limit(parseLimit)
  res.status(201).json({
     success: true,
  message: "Books retrieved successfully",
  data:result
  }) 
  }
  else{
    const result= await Book.find()
  res.status(201).json({
     success: true,
  message: "Books retrieved successfully",
  data:result
  }) 
  }
  
})
bookRoutes.get("/:bookId",async (req:Request,res:Response) => {
  const bookId=req.params.bookId
  const result=await Book.findById(bookId)
  res.status(201).json({
     success: true,
  message: "Book retrieved successfully",
  data:result
  })   
})
bookRoutes.post("/",async (req:Request,res:Response) => {
  const body=bookZodSchema.parse(req.body)
  const result= await Book.create(body)
  res.status(201).json({
     success: true,
  message: "Book created successfully",
  data:result
  })   
})
bookRoutes.patch("/:bookId",async (req:Request,res:Response) => {
       const bookId=req.params.bookId
  const body=bookUpdateZodSchema.parse(req.body)
  const result=await Book.findByIdAndUpdate(bookId,body,{new:true})
  res.status(201).json({
     success: true,
  message: "Book update successfully",
  data:result
  })   
})
bookRoutes.delete("/:bookId",async (req:Request,res:Response) => {
       const bookId=req.params.bookId

  const result=await Book.findByIdAndDelete(bookId)
  res.status(201).json({
     success: true,
  message: "Book deleted successfully",
  data:result
  })   
})
