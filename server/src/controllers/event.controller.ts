import { createEvent, findEvent } from "../models/event.model";
import express from "express";

export async function postEvent(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        const newEvent = await createEvent(req.body);

        return res.status(201).send({newEvent});
    } catch(err) {
        next(err)
    }

}

export async function getEvent(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        const event = await findEvent(req.params.eventId);

        return res.status(200).send({event});
    } catch (err) {
        next(err)
    }
}