import { fetchAllEvents } from "../models/events.model";
import express from "express";

export async function getAllEvents(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        const allEvents = await fetchAllEvents();

        return res.status(200).send({allEvents});
    } catch(err) {
        next(err)
    }

}