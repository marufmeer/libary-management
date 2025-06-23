import express, { Request, Response } from "express"
import { Borrow} from "../models/borrow_model"
import { borrowZodSchema } from "../ZodSchema/BorrowZodschema"

export const  borrowRoutes=express.Router()


borrowRoutes.post("/",async (req:Request,res:Response) => {
  const body=borrowZodSchema.parse(req.body)
  const result=await Borrow.create(body)
  res.status(201).json({
 
  success: true,
  message: "Book borrowed successfully",
  data:result 

  })
})
borrowRoutes.get("/",async (req:Request,res:Response) => {
  const result=await Borrow.aggregate([
    {
      $group:{
        _id:"$book",
        totalQuantity:{$sum:"$quantity"}
      }
    },
    {
      $lookup:{
        from:"books",
        localField:"_id",
        foreignField:"_id",
        as:"book"
      }
    },
  
    {
      
        $unwind:"$book"
      
    },
    {
      $project:{
      _id:0,
      title: 1,
    book:{
      title:"$book.title",
      isbn:"$book.isbn"
    },
    totalQuantity:1
      }
    }
  ])
res.status(200).json({
   success: true,
  message: "Borrowed books summary retrieved successfully",
  data:result
})
})