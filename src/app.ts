import "express-async-errors";

import dotenv from "dotenv";
import cors from "cors"
import express from "express";
import cookieParser from "cookie-parser"


import { NotFound } from "./middleware/notFound";
import { ErrorHandlerMiddleWare } from "./middleware/errorHandler";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

// middleware

app.use(cookieParser())
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("Keep building");
});


app.use(NotFound)
app.use(ErrorHandlerMiddleWare)



const start = () => {
    app.listen(PORT, () => console.log(`App is running  on port  ${PORT}`));
};

start();
