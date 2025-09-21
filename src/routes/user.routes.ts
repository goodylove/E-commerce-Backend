import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware";
import getCurrentUserController, { deleteUserController, getAllUserController, getSingleUserController, updateCurrentUserController } from "../controller/user.controller";
import authPermissionMiddleware from "../middleware/authPermisionMiddleware";

const UserRoutes = Router()

UserRoutes.get("/current", authMiddleware, getCurrentUserController)
UserRoutes.get('/', authMiddleware, authPermissionMiddleware('ADMIN'), getAllUserController)
UserRoutes.get('/:id', authMiddleware, authPermissionMiddleware('ADMIN'), getSingleUserController)
UserRoutes.patch('/:id', authMiddleware, updateCurrentUserController)
UserRoutes.delete("/:id", authMiddleware, authPermissionMiddleware('ADMIN'), deleteUserController)




export default UserRoutes