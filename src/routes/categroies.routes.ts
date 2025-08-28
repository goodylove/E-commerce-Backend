 import { Router } from "express";
import authPermissionMiddleware from "../middleware/authPermisionMiddleware";
import authMiddleware from "../middleware/authMiddleware";
import { CategoriesController } from "../controller/categorie.controller";

 const Categories = Router()

 Categories.post("/",authMiddleware,authPermissionMiddleware("admin"),CategoriesController)




 export default Categories


