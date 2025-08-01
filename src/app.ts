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


const PORT = process.env.PORT || 5001;
const app = express();

// middleware

app.use(cookieParser())
app.use(express.json())
app.use(cors())


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig));

app.get("/", (req, res) => {
    res.send("Keep building");
});
app.use("/api/v1/auth",AuthRouter)

app.use(NotFound)
app.use(ErrorHandlerMiddleWare)



const start = () => {
    app.listen(PORT, () => console.log(`App is running  on port  ${PORT}`));
};

start();

export default app 
