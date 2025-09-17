 import { Router } from "express";
import authPermissionMiddleware from "../middleware/authPermisionMiddleware";
import authMiddleware from "../middleware/authMiddleware";
import { BrandController, getAllBrandByIdServicesController, getAllBrandServicesController } from "../controller/brand.controller";
 const BrandRoutes = Router()

 BrandRoutes.post("/",authMiddleware,authPermissionMiddleware("ADMIN"),BrandController)
 BrandRoutes.get('/',authMiddleware, getAllBrandServicesController)
  BrandRoutes.get('/:id',authMiddleware, getAllBrandByIdServicesController)






 export default BrandRoutes


