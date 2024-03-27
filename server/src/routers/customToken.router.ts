import express from "express";
import { createIdToken } from "../controllers/customTokenController";

const customTokenRouter = express.Router();

export default customTokenRouter
    .post("/", createIdToken)