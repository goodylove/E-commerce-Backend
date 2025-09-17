import { PrismaClient } from "@prisma/client";
import { BadRequestError } from "../errors/customerErrors";

const prisma = new PrismaClient();

type BrandType = {
    name:string,
    slug:string

}

export const CreateBrandService = async ({name,slug}:BrandType)=>{

    const addBrand = await prisma.brand.create({
        data:{
           name,
           slug
        }
    })

     return addBrand
}

export  const getBrandServices = async() =>{
    const brand = await prisma.brand.findMany()
    return brand
}

export const getBrandsServicesById = async(id:string)=>{

const getBrandById = await prisma.brand.findUnique({
    where:{id}
})


if(!getBrandById){
    throw new BadRequestError(`No brand with this ${id}`)
}
return getBrandById
}



