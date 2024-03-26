import express from "express";
import { createEvent } from "../controllers/event.controller";

const eventRouter = express.Router();

export default eventRouter
    .post("/", createEvent)