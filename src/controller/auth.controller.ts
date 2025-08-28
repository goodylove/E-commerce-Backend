import { Request, Response } from "express";
import { BadRequestError } from "../errors/customerErrors";
import { StatusCodes } from "http-status-codes";
import { loginServices, refreshTokenServices, registerServices, verifyUserTokenServices } from "../services/auth.service";

export async function RegisterController(req: Request, res: Response) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new BadRequestError("All fields are required");
  }

  const user = await registerServices(req.body);

  res.status(StatusCodes.CREATED).json({ user,message:"Please verify  your email with the token sent to your email" });
}

export async function VerifyTokenController(req: Request, res: Response) {
  const  {token ,email} =  req.body

  if(!token || !email){
     throw new BadRequestError("All fields are required");
  }
  await verifyUserTokenServices({token,email})

  res.status(StatusCodes.OK).json({message:"Email Verification Successful"})
  
}

export async function RefreshTokenController(req:Request,res:Response){
  // const {token} = req.
   const incomingToken = req.signedCookies.refreshToken;

  if(!incomingToken){
    res.status(StatusCodes.BAD_REQUEST).json({message:"token is required"})
    return
  }


 await refreshTokenServices(incomingToken,res)

res.status(200).json({message:"Successfully Updated refresh token"})
}

export async function LoginController(req:Request,res:Response) {
  const {email ,password} =  req.body

  if(!email || !password){
    throw new BadRequestError("All Fields Are Required ")
  }

  const user = await loginServices({email,password,res})
  res.status(StatusCodes.OK).json({message:"User has Successfully Login",user})
  
}