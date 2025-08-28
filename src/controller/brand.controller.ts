import { StatusCodes } from "http-status-codes"
import { BadRequestError } from "../errors/customerErrors"
import { Response } from "express"
import { CreateBrandService } from "../services/brand.service"


export const BrandController = async (req:any,res:Response) =>{

    const {name,slug} = req.body

    if(!name || !slug){
        throw new BadRequestError("Please provide brand name or slug")
    }

    await CreateBrandService({name,slug})

    res.status(200).json({message:"brand added successfully"})

}
