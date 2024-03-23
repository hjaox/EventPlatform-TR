import express from "express";
import { loginUser } from "../controllers/login.controller";

const loginRouter = express.Router();

export default loginRouter
    .post("/", loginUser)