import request from "supertest";
import app from "../src/app";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

describe("Login Auth Routes", () => {
  beforeAll(async () => {
    const password = "password123";
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        email: "user@gmail.com",
        password: hashedPassword,
        name: "Test User",
        isVerified: true,
      },
    });
  });
  afterAll(async () => {
    await prisma.token.deleteMany();
    await prisma.user.deleteMany();
    await prisma.$disconnect();
  });

  test("should login with correct credentials", async () => {
    const res = await request(app)
      .post("/api/v1/auth/login")
      .send({ email: "user@gmail.com", password: "password123" });

    expect(res.status).toBe(StatusCodes.OK);
    expect(res.body).toHaveProperty("user");
    expect(res.headers["set-cookie"]).toBeDefined();
  });

  beforeAll(async () => {
    const password = "password123";
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        email: "users@gmail.com",
        password: hashedPassword,
        name: "Test User",
        isVerified: false,
      },
    });
  });
  afterAll(async () => {
    await prisma.user.deleteMany({ where: { email: "user@gmail.com" } });
    await prisma.$disconnect();
    await prisma.token.deleteMany();
    // await prisma.user.deleteMany();
  });

  test("should reject a user if not verified ", async () => {
    const res = await request(app)
      .post("/api/v1/auth/login")
      .send({ email: "users@gmail.com", password: "password123" });
    expect(res.status).toBe(StatusCodes.BAD_REQUEST);
    // expect(res.body).toBe({"message":"Please verify your email first"})
    expect(res.body).toMatchObject({
      message: "Please verify your email first",
    });
  });
});

describe("Register Auth Routes,", () => {
  beforeAll(async () => {
    await prisma.user.create({
      data: {
        email: "user@gmail.com",
        name: "user",
        password: "user123",
      },
    });
  });

  afterAll(async () => {
    await prisma.user.deleteMany({ where: { email: "user@gmail.com" } });
    await prisma.$disconnect();
    await prisma.token.deleteMany();
    // await prisma.user.deleteMany();
  });
  test("Should return user already exist if email has be used before", async () => {
    const res = await request(app)
      .post("/api/v1/auth/register")
      .send({ email: "user@gmail.com", name: "user", password: "user123" });

    expect(res.status).toBe(StatusCodes.BAD_REQUEST);
    expect(res.body).toMatchObject({ message: "User already exist" });
  });
});
