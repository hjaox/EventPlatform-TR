import EventModel from "../mongo/models/event.model";
import { TEvent } from "../common/types";

export async function postEvent(eventDetails: TEvent) {
    try {
        return await EventModel.create(eventDetails);
    } catch(err) {
        return Promise.reject({status: 400, msg: "Bad request"})
    }
}