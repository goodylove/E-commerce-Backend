import express from "express";
import { LoginController, RefreshTokenController, RegisterController, VerifyTokenController } from "../controller/auth.controller";

const AuthRouter = express.Router()


AuthRouter.post("/register", RegisterController)
AuthRouter.post("/verify-email",VerifyTokenController)
AuthRouter.post("/login",LoginController)
AuthRouter.post("/refresh-token", RefreshTokenController)



export default AuthRouter

