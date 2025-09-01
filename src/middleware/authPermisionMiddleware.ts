import { NextFunction, Response } from "express";
import { unauthorized } from "../errors/customerErrors";

function authPermissionMiddleware(...roles: string[]) {
    console.log(roles)
    return (req: any, res: Response, next: NextFunction) => {
        if(!roles.includes(req.user.role)){
            throw new unauthorized("Unauthorized to access this route");
        }
        next();
    }
  
}

export default authPermissionMiddleware;