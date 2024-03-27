import express from "express";
import { getEvent, postEvent } from "../controllers/event.controller";

const eventRouter = express.Router();

export default eventRouter
    .post("/", postEvent)
    .get("/:eventId", getEvent)