import express, { Application, Request, Response } from "express";

import { borrowRoutes } from "./App/controllers/borrow_controller";
import { bookRoutes } from "./App/controllers/book_controller";
const app:Application=express()
app.use(express.json())

app.use("/books",bookRoutes)
app.use("/borrow",borrowRoutes)
app.get('/',async (req:Request,res:Response) => {
   res.send("server is created sucsessfully") 
})

export default app