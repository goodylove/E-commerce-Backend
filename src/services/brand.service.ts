import { PrismaClient } from "@prisma/client";

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