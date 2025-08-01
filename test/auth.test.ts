import request from "supertest";
import app from "../src/app"
import { StatusCodes } from "http-status-codes";
import bcrypt from 'bcrypt'

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


describe("Auth Routes",()=>{
    beforeAll(async () => {
        const password = "password123";
const hashedPassword = await bcrypt.hash(password, 10)

  await prisma.user.create({
    data: {
      email: "useq@gmail.com",
      password: hashedPassword, 
      name: "Test User"
    }
  });
});


    test('should login with correct credentials',async()=>{
        const res =  await request(app).post("/api/v1/auth/login").send({email:"useq@gmail.com",password:"password123"})

        expect(res.status).toBe(StatusCodes.OK)
        expect(res.body).toHaveProperty("user")
        expect(res.headers['set-cookie']).toBeDefined()
    })
})