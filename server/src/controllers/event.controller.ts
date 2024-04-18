import mongoose from "mongoose";
import { createEvent, deleteEvent, findEvent, insertAttendee, updateEvent } from "../models/event.model";
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
    if(!mongoose.isValidObjectId(req.params.eventId)) {
        return res.status(400).send({message: "Please provide a valid event id."});
    }

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

export async function addAttendee(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { name, email, quantity } = req.body
    const { eventId } = req.params;
    try {
        const updatedAttendees = await insertAttendee(eventId, name, email, Number(quantity));

        return res.status(200).send({ updatedAttendees });
    } catch (err) {
        next(err)
    }
}