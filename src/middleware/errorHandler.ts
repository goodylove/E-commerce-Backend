import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export function ErrorHandlerMiddleWare(err:any,req:Request,res:Response,next:NextFunction){

const customErr = {
    statusCode:err.statusCodes || StatusCodes.INTERNAL_SERVER_ERROR,
    message :err.message || "Internal server error"
}


 if ((err.code === 'P2002')) {
    customErr.message = 'Email already exist';
    customErr.statusCode = StatusCodes.BAD_REQUEST;
  }
res.status(customErr.statusCode).json({message:customErr.message})
}