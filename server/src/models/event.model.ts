import EventModel from "../mongo/models/event.model";
import { TEvent } from "../common/types";

export async function createEvent(eventDetails: TEvent) {
    try {
        return await EventModel.create(eventDetails);
    } catch(err) {
        return Promise.reject({status: 400, msg: "Bad request"});
    }
}

export async function findEvent(eventId: string) {
    try {
        return await EventModel.find({_id: eventId});
    } catch(err) {
        return Promise.reject({status: 400, msg: "Bad request"});
    }
}