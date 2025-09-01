 import { Router } from "express";
import authPermissionMiddleware from "../middleware/authPermisionMiddleware";
import authMiddleware from "../middleware/authMiddleware";
import { CategoriesController } from "../controller/categorie.controller";

 const Categories = Router()

 Categories.post("/",authMiddleware,authPermissionMiddleware("ADMIN"),CategoriesController)




 export default Categories


