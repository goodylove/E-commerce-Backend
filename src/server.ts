
import dotenv from "dotenv";
dotenv.config();

import app from "./app";


const PORT = process.env.PORT || 5001;
const start = () => {
    app.listen(PORT, () => console.log(`App is running  on port  ${PORT}`));
};

start();