import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type CategoriesType = {
    name:string,
    slug:string

}

export const CreateCategoriesServices = async ({name,slug}:CategoriesType)=>{

    const addBrand = await prisma.category.create({
        data:{
           name,
           slug
        }
    })

     return addBrand
}