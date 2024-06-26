import { createEvent, deleteEvent, findEvent, insertAttendee, updateEvent } from "../models/event.model";
import express from "express";
import { checkAttendee, checkIfValidObjectId, checkPatchEvent, checkPostEvent, sendTicketEmail } from "../utils/utils";

export async function postEvent(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (!checkPostEvent(req.body)) return res.status(400).send({ message: "To post an event, it must have the following properties: title, dateStart, dateEnd, address" });

    try {
        const newEvent = await createEvent(req.body);

        return res.status(201).send({ newEvent });
    } catch (err) {
        next(err)
    }

}

export async function getEvent(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (!checkIfValidObjectId(req.params.eventId)) {
        return res.status(400).send({ message: "Please provide a valid event id." });
    }

    try {
        const eventDetails = await findEvent(req.params.eventId);

        return res.status(200).send({ eventDetails });
    } catch (err) {
        next(err)
    }
}

export async function patchEvent(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (!checkPatchEvent(req.body)) return res.status(400).send({ message: "To post an event, it must have any of the following properties: title, dateStart, dateEnd, address, details, attendees, summary, tag, price, openPrice" });

    if (!checkIfValidObjectId(req.params.eventId)) {
        return res.status(400).send({ message: "Please provide a valid event id." });
    }

    try {
        const updatedEventDetails = await updateEvent(req.params.eventId, req.body);

        return res.status(200).send({ updatedEventDetails });
    } catch (err) {
        next(err)
    }
}

export async function removeEvent(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (!checkIfValidObjectId(req.params.eventId)) {
        return res.status(400).send({ message: "Please provide a valid event id." });
    }

    try {
        await deleteEvent(req.params.eventId);

        return res.status(204).send();
    } catch (err) {
        next(err)
    }
}

export async function addAttendee(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (!checkAttendee(req.body)) return res.status(400).send({ message: "To log an attendee to an event, it must have the following properties: name, email, quantity" });

    if (!checkIfValidObjectId(req.params.eventId)) {
        return res.status(400).send({ message: "Please provide a valid event id." });
    }

    const { name, email, quantity } = req.body;
    const { eventId } = req.params;

    try {
        const updatedAttendees = await insertAttendee(eventId, name, email, Number(quantity));
        const { title } = await findEvent(eventId);
        await sendTicketEmail(email, title, quantity);

        return res.status(200).send({ updatedAttendees });
    } catch (err) {
        next(err)
    }
}