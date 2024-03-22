import express from "express";
import { postUser } from "../models/register.model";

export const registerUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { name, email, password } = req.body;

    try {
        const { newUser, userToken } = await postUser(name, email, password);

        return res.status(201)
            .setHeader("Authorization", `Bearer ${userToken}`)
            .send({ newUser })
    } catch (err) {
        next(err)
    }
}