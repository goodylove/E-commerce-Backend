import { PrismaClient } from "@prisma/client";
import { BadRequestError } from "../errors/customerErrors";





const prisma = new PrismaClient()
export async function getCurrentUser(userId:string){

    const user = await prisma.user.findUnique({
        where:{id:userId},
        include:{
        Order:{
            include:{
                items:{
                    include:{product:true}
                },
                Payment:true,
                address:true
            }
        },
        CartItem:{
            include:{
                product:true
            }
        }
        }

    })
    if(!user){
        throw new BadRequestError("Not user found")
    }
    return user
}