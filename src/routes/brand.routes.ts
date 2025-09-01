 import { Router } from "express";
import authPermissionMiddleware from "../middleware/authPermisionMiddleware";
import authMiddleware from "../middleware/authMiddleware";
import { BrandController } from "../controller/brand.controller";
 const BrandRoutes = Router()

 BrandRoutes.post("/",authMiddleware,authPermissionMiddleware("ADMIN"),BrandController)




 export default BrandRoutes


