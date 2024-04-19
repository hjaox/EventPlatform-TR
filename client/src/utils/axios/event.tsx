import { TEvent, TNewEvent, TPatchEvent } from "../../common/types";
import instance from "./instance";

export async function getEvent(eventId: string): Promise<TEvent> {
    const { data: { eventDetails } } = await instance
        .get(`/event/${eventId}`);

    return eventDetails;
}

export async function createEvent(event: TNewEvent, token: string) {
    const { data: { newEvent } } = await instance
        .post("/event", event, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

    return newEvent;
}

export async function deleteEvent(eventId: string, token: string) {
    await instance
        .delete(`/event/${eventId}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
}

export async function editEvent(eventId: string, eventDetails: TPatchEvent, token: string) {
    const { data: { updatedEventDetails } } = await instance
        .patch(`/event/${eventId}`, eventDetails, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

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