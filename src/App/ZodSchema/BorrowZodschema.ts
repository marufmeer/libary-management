import  z from "zod"

export const borrowZodSchema= z.object({
  book:z.string(),
  quantity:z.number().int().positive(),
  dueDate:z.string()
})