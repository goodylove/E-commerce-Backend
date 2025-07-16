import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export function ErrorHandlerMiddleWare(err:any,req:Request,res:Response,next:NextFunction){

const customErr = {
    statusCode:err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message :err.message || "Internal server error"
}

res.status(customErr.statusCode).json({message:customErr.message})
}