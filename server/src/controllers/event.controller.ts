import { postEvent } from "../models/event.model";
import express from "express";

export async function createEvent(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        const newUser = await postEvent(req.body);

        return res.status(201).send({newUser});
    } catch(err) {
        next(err)
    }

}