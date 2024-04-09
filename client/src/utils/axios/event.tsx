import { TEvent } from "../../common/types";
import instance from "./instance";

export async function getEvent(eventId: string) {
    const {data: {eventDetails}} = await instance
    .get(`/event/${eventId}`);

    return eventDetails;
}

export async function createEvent(event: TEvent) {
    const {data: {newEvent}} = await instance
    .post("/event" ,event)

    return newEvent
}