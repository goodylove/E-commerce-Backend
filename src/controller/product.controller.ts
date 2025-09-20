import { Response } from "express";
import { createProductSchema } from "../utils/validation";
import { createProductServices } from "../services/product.service";
import { StatusCodes } from "http-status-codes";

const createProductController = async(req:any,res:Response)=>{
const parsed = createProductSchema.safeParse(req.body)

if(!parsed.success){
     return res.status(400).json({
        status: "error",
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors
      });
}
 const product = await createProductServices(parsed)
 res.status(StatusCodes.CREATED).json({message: "product created successfully",product})
}