import { TNewEvent } from "../../common/types";
import instance from "./instance";

export async function getEvent(eventId: string) {
    const {data: {eventDetails}} = await instance
    .get(`/event/${eventId}`);

    return eventDetails;
}

export async function createEvent(event: TNewEvent) {
    const {data: {newEvent}} = await instance
    .post("/event" ,event)

    return newEvent
}

export async function deleteEvent(eventId: string) {
    await instance
    .delete(`/event/${eventId}`)
}