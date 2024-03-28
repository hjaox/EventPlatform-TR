import instance from "./instance";

export async function getEvent(eventId: string) {
    const {data: {eventDetails}} = await instance
    .get(`/event/${eventId}`);

    return eventDetails;
}