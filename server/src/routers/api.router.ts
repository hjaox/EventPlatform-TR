import express from "express";
import registerRouter from "./register.router";

const apiRouter = express.Router();


export default apiRouter
.use("/register", registerRouter)