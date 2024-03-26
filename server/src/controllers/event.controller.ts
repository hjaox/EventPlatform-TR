import { postEvent } from "../models/event.model";
import express from "express";

export async function createEvent(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        const newEvent = await postEvent(req.body);

        return res.status(201).send({newEvent});
    } catch(err) {
        next(err)
    }

}