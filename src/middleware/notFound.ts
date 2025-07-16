import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export function NotFound(req:Request,res:Response){
    res.status(StatusCodes.NOT_FOUND).json({message:"Page not found"})

}