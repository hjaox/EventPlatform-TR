import express from "express";
import { loginUser, registerUser, signOutUser } from "../controllers/user.controller";

const userRouter = express.Router();

export default userRouter
    .post("/login", loginUser)
    .post("/register", registerUser)
    .get("/signout", signOutUser);
