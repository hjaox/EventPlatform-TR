import { TEvent, TNewEvent, TPatchEvent } from "../../common/types";
import instance from "./instance";

export async function getEvent(eventId: string): Promise<TEvent> {
    const { data: { eventDetails } } = await instance
        .get(`/event/${eventId}`);

    return eventDetails;
}

export async function createEvent(event: TNewEvent) {
    const { data: { newEvent } } = await instance
        .post("/event", event)

    return newEvent;
}

export async function deleteEvent(eventId: string) {
    await instance
        .delete(`/event/${eventId}`);
}

export async function editEvent(eventId: string, eventDetails: TPatchEvent) {
    const { data: { updatedEventDetails } } = await instance
        .patch(`/event/${eventId}`, eventDetails)

    return updatedEventDetails;
}

export async function addAttendee(eventId: string, name: string, email: string, quantity: number) {
    const { data: { updatedAttendees } } = await instance
        .patch(`/event/attendees/${eventId}`, { name, email, quantity });

    if (updatedAttendees) {
        return true;
    }

    return false;
}