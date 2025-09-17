import { StatusCodes } from "http-status-codes"
import { BadRequestError } from "../errors/customerErrors"
import { Response } from "express"
import { CreateBrandService, getBrandServices, getBrandsServicesById } from "../services/brand.service"


export const BrandController = async (req:any,res:Response) =>{

    const {name,slug} = req.body

    if(!name || !slug){
        throw new BadRequestError("Please provide brand name or slug")
    }

    await CreateBrandService({name,slug})

    res.status(200).json({message:"brand added successfully"})

}

export const getAllBrandServicesController = async(req,res)=>{

 const allBrands = await getBrandServices()
 res.status(200).json({message:'all brand list retrieved successfully',data:allBrands})
}

export const getAllBrandByIdServicesController = async(req,res)=>{
    const {id} = req.params

    if(!id){
     throw new BadRequestError('Please the brand Id')
    }

 const singleIdBrands = await getBrandsServicesById(id)
 res.status(200).json({message:'Brand retrieved successfully',data:singleIdBrands})
}