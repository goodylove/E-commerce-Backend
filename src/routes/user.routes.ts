 import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware";
import getCurrentUserController from "../controller/user.controller";

 const UserRoutes = Router()

 UserRoutes.get("/current",authMiddleware,getCurrentUserController)




 export default UserRoutes