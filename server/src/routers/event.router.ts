import express from "express";
import { getEvent, patchEvent, postEvent, removeEvent } from "../controllers/event.controller";

const eventRouter = express.Router();

export default eventRouter
    .post("/", postEvent)
    .get("/:eventId", getEvent)
    .patch("/:eventId", patchEvent)
    .delete("/:eventId", removeEvent)