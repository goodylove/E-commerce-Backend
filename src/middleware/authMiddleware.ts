import { NextFunction, Response } from "express";
import Jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

import { unAuthenticated } from "../errors/customerErrors";
import { attachCookiesToResponse } from "../utils/token";

const prisma = new PrismaClient();

async function authMiddleware(req: any, res: Response, next: NextFunction) {
  const { accessToken, refreshToken } = req.cookies

  try {
    if (accessToken) {
      try {
        // verify the token if it is valid
        const decoded = Jwt.verify(accessToken, process.env.JWT_SECRET);

        if (
          decoded &&
          typeof decoded !== "string" &&
          decoded.hasOwnProperty("userId")
        ) {
          req.user = {
            userId: decoded.userId,
            role: decoded.role,
            name: decoded.name,
            email: decoded.email,
          };
          return next();
        }
        throw new unAuthenticated("Invalid access token");
      } catch (error) {
        if (error.name !== "TokenExpiredError") {
          throw new unAuthenticated("Invalid access token");
        }
      }
    }

    if (!refreshToken) {
      throw new unAuthenticated("Authentication is required");
    }

    const storedToken = await prisma.token.findUnique({
      where: { refreshToken },
      include: { user: true },
    });

    if (!storedToken || storedToken.expiresAt < new Date()) {
      throw new unAuthenticated("Authentication is required");
    }
    const payload ={
        userId: storedToken.user.id,
        name: storedToken.user.name,
        email: storedToken.user.email,
        role: storedToken.user.role,
    }
    
    // create new access token
    attachCookiesToResponse({res, payload, refreshToken });
    req.user = payload;
    next();



  } catch (error) {
    next(error);
  }
}

export default authMiddleware