import { getConsent, scheduleEvent } from "../controllers/google.controller";
import express from "express";

const googleRouter = express.Router();

export default googleRouter
  .get("/oauth2callback", getConsent)
  .post("/schedule-event", scheduleEvent);