import express from "express";
import { getUserWithCredentials } from "../models/login.model";

export async function loginUser(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { email, password } = req.body;

    try {
        const userDetails = await getUserWithCredentials(email, password);
        console.log(userDetails)
        return res.status(200)
            .send({userDetails});
    } catch (err) {
        next(err);
    }
}