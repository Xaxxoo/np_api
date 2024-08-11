import http from "http";
import connectDB from "./utils/db";
import { app } from "./app";
require("dotenv").config();
const server = http.createServer(app);



// create server
server.listen(process.env.PORT, () => {
    console.log(`Server is connected on port ${process.env.PORT}`);
    connectDB();
});