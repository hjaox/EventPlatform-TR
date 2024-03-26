import express from "express";
import registerRouter from "./register.router";
import loginRouter from "./login.router";
import eventRouter from "./event.router";
import customTokenRouter from "./customToken.router";
import eventsRouter from "./events.router";
import tagsRouter from "./tags.router";

const apiRouter = express.Router();

export default apiRouter
    .use("/register", registerRouter)
    .use("/login", loginRouter)
    .use("/event", eventRouter)
    .use("/customToken", customTokenRouter)
    .use("/events", eventsRouter)
    .use("/tags", tagsRouter);