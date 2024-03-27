import { createEvent, deleteEvent, findEvent, updateEvent } from "../models/event.model";
import express from "express";

export async function postEvent(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        const newEvent = await createEvent(req.body);

        return res.status(201).send({ newEvent });
    } catch (err) {
        next(err)
    }

}

export async function getEvent(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        const eventDetails = await findEvent(req.params.eventId);

        return res.status(200).send({ eventDetails });
    } catch (err) {
        next(err)
    }
}

export async function patchEvent(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        const updatedEventDetails = await updateEvent(req.params.eventId, req.body);

        return res.status(200).send({ updatedEventDetails });
    } catch (err) {
        next(err)
    }
}

export async function removeEvent(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        await deleteEvent(req.params.eventId);

        return res.status(204).send();
    } catch (err) {
        next(err)
    }
}