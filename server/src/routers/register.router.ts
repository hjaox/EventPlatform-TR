import express from "express";
import { registerUser } from "../controllers/register.controller";

const registerRouter = express.Router();

export default registerRouter
    .post("/", registerUser)