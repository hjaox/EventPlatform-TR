import mongoose from "mongoose";

export function checkPatchEvent(event: unknown) {
    const eventProperties = ["title", "dateStart", "dateEnd", "address", "details", "summary", "tag", "price", "openPrice"];

    if (!event || typeof event !== "object" || Array.isArray(event)) return false;

    for (const property of eventProperties) {
        if (Object.keys(event).includes(property)) return true;
    }

    return false;
}

export function checkPostEvent(event: unknown) {
    const eventProperties = ["title", "dateStart", "dateEnd", "address"];

    if (!event || typeof event !== "object" || Array.isArray(event)) return false;

    for (const property of eventProperties) {
        if (!Object.keys(event).includes(property)) return false;
    }

    return true;
}

export function checkAttendee(attendee: unknown) {
    const attendeeProperty = ["name", "email", "quantity"];

    if (!attendee || typeof attendee !== "object" || Array.isArray(attendee)) return false;

    for (const property of attendeeProperty) {
        if (!Object.keys(attendee).includes(property)) return false;
    }

    return true;
}

export function checkIfValidObjectId(objectId: unknown) {
    return mongoose.isValidObjectId(objectId);
}