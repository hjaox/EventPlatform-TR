import express from "express";
import registerRouter from "./register.router";
import loginRouter from "./login.router";

const apiRouter = express.Router();

export default apiRouter
    .use("/register", registerRouter)
    .use("/login", loginRouter)