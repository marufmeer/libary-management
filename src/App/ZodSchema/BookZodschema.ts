import  z from "zod"

export const bookZodSchema= z.object({
 title :z.string(),
author:z.string(),
genre:z.string() ,
isbn: z.string(),
description: z.string().optional(),
copies :z.number().int().positive() ,
available:z.boolean(),
})
export const bookUpdateZodSchema=bookZodSchema.partial()