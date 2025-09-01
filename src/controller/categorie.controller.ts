import { StatusCodes } from "http-status-codes"
import { BadRequestError } from "../errors/customerErrors"
import { CreateCategoriesServices } from "../services/categories.service"
import { Response } from "express"


export const CategoriesController = async (req:any,res:Response) =>{

    const {name,slug} = req.body

    if(!name || !slug){
        throw new BadRequestError("Please provide categories name or slug")
    }

    await CreateCategoriesServices({name,slug})

    res.status(200).json({message:"categories added successfully"})

}
