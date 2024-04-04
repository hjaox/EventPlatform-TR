import express from "express";
import { getUserWithCredentials, postUser } from "../models/user.model";

export async function loginUser(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { email, password } = req.body;

    try {
        const userDetails = await getUserWithCredentials(email, password);

        return res.status(200)
            .send({userDetails});
    } catch (err) {
        next(err);
    }
}

export const registerUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { name, email, password } = req.body;

    try {
        const {newUser, userToken} = await postUser(name, email, password);

        return res.status(201)
            .send({newUser, accessToken: userToken});
    } catch (err) {
        next(err)
    }
}