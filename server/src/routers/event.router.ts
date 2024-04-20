import express from "express";
import { addAttendee, getEvent, patchEvent, postEvent, removeEvent } from "../controllers/event.controller";
import { authHandler } from "../middleware/authHandler";

const eventRouter = express.Router();

export default eventRouter
    .get("/:eventId", getEvent)
    .patch("/attendees/:eventId", addAttendee)
    .use(authHandler)
    .post("/", postEvent)
    .patch("/:eventId", patchEvent)
    .delete("/:eventId", removeEvent);