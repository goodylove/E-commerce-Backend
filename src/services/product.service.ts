import { PrismaClient } from "@prisma/client";
import { ProductTypes } from "../../interface/product";
import { BadRequestError } from "../errors/customerErrors";
import slugify from "slugify";

const prisma = new PrismaClient()




export const createProductServices = async(products)=>{

const existingProduct = await prisma.product.findUnique({
    where:{slug:products.slug}
})    

if(existingProduct){
    throw new BadRequestError("Product already exist with this slug")
}

// Products must belong to an existing category and brand.
const categoryExist = await prisma.category.findUnique({
    where:{id:products.categoryId}
})

if(!categoryExist){
     throw new BadRequestError("Invalid category Id")
}

const slug = slugify(products.name, { lower: true, strict: true });


}

