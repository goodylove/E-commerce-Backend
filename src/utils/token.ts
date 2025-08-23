import { Response } from "express";
import { UserPayloadTypes } from "../../interface/auth";
import jwt  from "jsonwebtoken";



type JwtPayload = {
    userId: string;
    name: string;
    email: string;
    role: string;
}

function createJwt(payload: JwtPayload){
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '15m' });
    return token;

}

 export function attachCookiesToResponse({
    res,
    payload,
    refreshToken
}: {
    res: Response;
    payload: JwtPayload
    refreshToken: string;
}) {
    const accessToken = createJwt(payload);
   
    
    const oneDay = 1000 * 60 * 60 * 24;
    const oneHour = 1000 * 60 * 15;
    

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: oneHour,
        signed: true,
    });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: oneDay,
        signed: true,
    });
}
