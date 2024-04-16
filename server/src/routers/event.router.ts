import express from "express";
import { addAttendee, getEvent, patchEvent, postEvent, removeEvent } from "../controllers/event.controller";

const eventRouter = express.Router();

export default eventRouter
    .get("/:eventId", getEvent)
    .post("/", postEvent)
    .patch("/attendees/:eventId", addAttendee)
    .patch("/:eventId", patchEvent)
    .delete("/:eventId", removeEvent);