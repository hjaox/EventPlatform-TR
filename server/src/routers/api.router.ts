import express from "express";
import eventRouter from "./event.router";
import customTokenRouter from "./customToken.router";
import eventsRouter from "./events.router";
import tagsRouter from "./tags.router";
import { getPaymentIntent } from "../controllers/stripe.controller";
import googleRouter from "./google.router";
import userRouter from "./user.router";

const apiRouter = express.Router();

export default apiRouter
    .use("/event", eventRouter)
    .use("/customToken", customTokenRouter)
    .use("/events", eventsRouter)
    .use("/tags", tagsRouter)
    .get("/create-payment-intent/:price", getPaymentIntent)
    .use("/google", googleRouter)
    .use("/user", userRouter);