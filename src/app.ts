import "express-async-errors";

import dotenv from "dotenv";
dotenv.config();

import cors from "cors"
import express from "express";
import cookieParser from "cookie-parser"
import swaggerUi from 'swagger-ui-express';


import { NotFound } from "./middleware/notFound";
import { ErrorHandlerMiddleWare } from "./middleware/errorHandler";
import { swaggerConfig } from "./config/swagger";
import AuthRouter from "./routes/auth.routes";
import BrandRoutes from "./routes/brand.routes";
import Categories from "./routes/categroies.routes";
import ProductRouter from "./routes/product.routes";
import UserRoutes from "./routes/user.routes";


const app = express();

// middleware

app.use(cookieParser(process.env.JWT_SECRET))
app.use(express.json())
app.use(cors())


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig));

app.get("/", (req, res) => {
    res.send("Keep building");
});
app.use("/api/v1/auth",AuthRouter)
app.use("/api/v1/brands",BrandRoutes)
app.use("/api/v1/categories", Categories)
app.use("/api/v1/products",ProductRouter)
app.use('/api/v1/users',UserRoutes)


app.use(NotFound)
app.use(ErrorHandlerMiddleWare)





export default app 
