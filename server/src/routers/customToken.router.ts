import express from "express";
import { createCustomToken } from "../controllers/customTokenController";

const customTokenRouter = express.Router();

export default customTokenRouter
    .post("/", createCustomToken)