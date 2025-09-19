import { Request, Response } from "express";
import { UserPayloadTypes } from "../../interface/auth";
import { BadRequestError, unAuthenticated } from "../errors/customerErrors";
import { getCurrentUser } from "../services/user.service";
import { StatusCodes } from "http-status-codes";

interface CustomRequest extends Request {
    user:UserPayloadTypes
}

 export default async function getCurrentUserController(req:CustomRequest,res:Response) {
    const userId = req.user.userId

    if(!userId){
        throw new unAuthenticated('User not authenticated')
    }


    const user = await getCurrentUser(userId)
     res.status(StatusCodes.OK).json({
        message:"Current user retrieved",
        data:user
     })
}

    
