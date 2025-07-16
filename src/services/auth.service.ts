import {PrismaClient} from "@prisma/client"
import { RegisterTypes } from "../../interface/auth"
import { BadRequestError } from "../errors/customerErrors"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()


export  async function registerService (user:RegisterTypes){
    const existingUser = prisma.user.findUnique({
        where:{email:user.email}
    })

    if(existingUser){
        throw new BadRequestError("User already exist")
    }


    const salt = await bcrypt.genSalt(10)
    const hashPassword =  await bcrypt.hash(user.password,salt)

    const verificationToken = Math.floor(10000 + Math.random()* 900000).toString()

    const newUser = prisma.user.create({
        data:{
            email:user.email,
            name:user.name,
            password:hashPassword,
            role:user.role,
            
            

        }
    })
    // send verification token


} 