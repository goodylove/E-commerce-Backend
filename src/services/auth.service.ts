import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import crypto from "crypto";

import { addDays } from "date-fns";

import { RegisterTypes, VerifyUserTokenTypes } from "../../interface/auth";
import { BadRequestError } from "../errors/customerErrors";
import { handleEmailService } from "../config/email";
import { VERIFICATION_EMAIL_TEMPLATE } from "../config/emailTemplate";
import { attachCookiesToResponse } from "../utils/token";
import { Response } from "express";
import { generateToken } from "../utils/generateToken";

const prisma = new PrismaClient();

export async function registerServices(user: RegisterTypes) {
  const existingUser = await prisma.user.findUnique({
    where: { email: user.email },
  });

  if (existingUser) {
    throw new BadRequestError("User already exist");
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(user.password, salt);

  // const verificationToken = Math.floor(
  //   10000 + Math.random() * 900000
  // ).toString();


  const verificationToken = generateToken()

  const newUser = await prisma.user.create({
    data: {
      name: user.name,
      email: user.email,
      role: user.role,
      password: hashPassword,
      verificationToken,
    },
  });

  // send verification token
  await handleEmailService({
    to: newUser.email,
    subject: "Verification Token",
    message: `${VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", newUser.verificationToken)}`,
  });
  //   remove password from newUser
  const removePasswordFromNewUser = {
    email: newUser.email,
    name: newUser.name,
    role: newUser.role,
  };
  return removePasswordFromNewUser;
}

export async function verifyUserTokenServices({
  token,
  email,
}: VerifyUserTokenTypes) {
  const user = await prisma.user.findFirst({ where: { verificationToken: token } });

  if (!user) {
    throw new BadRequestError("No user found");
  }

  if (user.verificationToken != token) {
    throw new BadRequestError("Invalid verification Token");
  }


  let updateData: any = {
    isVerified: true,
    verificationToken: null
  }

  if (user.pendingEmail) {
    updateData.email = user.pendingEmail,
      updateData.pendingEmail = null
  }




  await prisma.user.update({
    where: { email: user.email },
    data: updateData
  });
}

export async function loginServices({
  email,
  password,
  res
}: {
  email: string;
  password: string;
  res: Response;
}) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new BadRequestError("No user found");
  }
  if (!user.isVerified) {
    throw new BadRequestError("Please verify your email first");
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new BadRequestError("Invalid Password");
  }

  const payload = {
    role: user.role,
    userId: user.id,
    name: user.name,
    email: user.email
  };

  // check if there is a valid refresh token for this user
  const existingToken = await prisma.token.findFirst({
    where: {
      userId: user.id,
      expiresAt: { gt: new Date() }
    }

  })
  let refreshToken = existingToken?.refreshToken

  if (!refreshToken) {
    refreshToken = crypto.randomBytes(32).toString("hex");
    await prisma.token.create({
      data: {
        refreshToken,
        userId: user.id,
        expiresAt: addDays(new Date(), 7),
      },
    });

  }





  attachCookiesToResponse({ res, payload, refreshToken });
  // check for existing token


  const safeUser = {
    name: user.name,
    email: user.email,
    role: user.role,
    verified: user.isVerified,
    id: user.id
  }
  return safeUser
}

export async function refreshTokenServices(
  _refreshToken: string,
  res: Response
) {
  const getRefreshToken = await prisma.token.findUnique({
    where: {
      refreshToken: _refreshToken,
    },
    include: {
      user: true,
    },
  });

  if (!getRefreshToken || getRefreshToken.expiresAt < new Date()) {
    throw new BadRequestError("Invalid refresh token");
  }

  // issue new refresh token and access token

  const payload = {
    userId: getRefreshToken.userId,
    role: getRefreshToken.user.role,
    name: getRefreshToken.user.name,
    email: getRefreshToken.user.email
  };
  const newRefreshToken = crypto.randomBytes(32).toString("hex");

  attachCookiesToResponse({ res, payload, refreshToken: newRefreshToken });

  // save new refreshToken and delete old refreshToken
  await prisma.token.delete({
    where: { refreshToken: getRefreshToken.refreshToken },
  });

  await prisma.token.create({
    data: {
      refreshToken: newRefreshToken,
      userId: getRefreshToken.userId,
      expiresAt: addDays(new Date(), 7),
    },
  });
}
