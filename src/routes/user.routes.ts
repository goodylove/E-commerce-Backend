import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware";
import getCurrentUserController, { deleteUserController, getAllUserController, updateCurrentUserController } from "../controller/user.controller";

const UserRoutes = Router()

UserRoutes.get("/current", authMiddleware, getCurrentUserController)
UserRoutes.get('/', authMiddleware, getAllUserController)
UserRoutes.patch('/:id', authMiddleware, updateCurrentUserController)
UserRoutes.delete("/:id", authMiddleware, deleteUserController)




export default UserRoutes