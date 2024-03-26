import express from "express";
import { getAllEvents } from "../controllers/events.controller";

const eventsRouter = express.Router();

export default eventsRouter
    .get("/", getAllEvents)