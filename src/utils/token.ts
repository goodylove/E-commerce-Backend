import { Response } from "express";
import { UserPayloadTypes } from "../../interface/auth";
import jwt  from "jsonwebtoken";

function createJwt({payload,refreshToken}:{payload:UserPayloadTypes,refreshToken?:string| null} ) {
    const token = jwt.sign({payload,refreshToken}, process.env.JWT_SECRET, { expiresIn: '15m' });
    return token;

}

 export function attachCookiesToResponse({
    res,
    payload,
    refreshToken
}: {
    res: Response;
    payload: UserPayloadTypes;
    refreshToken: string;
}) {
    const accessToken = createJwt({payload});
   
    
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
