import express from "express";
import { getEvent, patchEvent, postEvent, removeEvent } from "../controllers/event.controller";

const eventRouter = express.Router();

export default eventRouter
    .get("/:eventId", getEvent)
    .post("/", postEvent)
    .patch("/:eventId", patchEvent)
    .delete("/:eventId", removeEvent);