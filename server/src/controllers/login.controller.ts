import express from "express";
import { getUserWithCredentials } from "../models/login.model";

export async function loginUser(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { name, email, password } = req.body;

    try {
        const {userDetails, userToken } = await getUserWithCredentials(name, email, password);

        return res.status(200)
        .setHeader("Authorization", `Bearer ${userToken}`)
        .send({ userDetails });
    } catch (err) {
        next(err);
    }
}