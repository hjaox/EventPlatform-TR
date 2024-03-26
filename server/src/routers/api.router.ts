import express from "express";
import registerRouter from "./register.router";
import loginRouter from "./login.router";
import eventRouter from "./event.router";

const apiRouter = express.Router();

export default apiRouter
    .use("/register", registerRouter)
    .use("/login", loginRouter)
    .use("/event", eventRouter)