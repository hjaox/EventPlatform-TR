import EventModel from "../mongo/models/event.model";
import { TEvent, TEventUpdate } from "../common/types";



export async function createEvent(eventDetails: TEvent) {
    try {
        return await EventModel.create(eventDetails);
    } catch (err) {
        return Promise.reject({ status: 400, message: "Bad Request" });
    }
}

export async function findEvent(eventId: string) {
    try {
        const result = await EventModel.findById({ _id: eventId });

        if (!result) return Promise.reject({ status: 404, message: "Not Found" })

        return result;
    } catch (err) {
        return Promise.reject({ status: 400, message: "Bad Request" });
    }
}

export async function updateEvent(eventId: string, updateDetails: TEventUpdate) {
    try {
        const result = await EventModel.findByIdAndUpdate(
            {
                _id: eventId
            },
            updateDetails,
            {
                new: true
            }
        );

        if (!result) return Promise.reject({ status: 404, message: "Not Found" });

        return result;
    } catch (err) {
        return Promise.reject({ status: 400, message: "Bad Request" })
    }
}

export async function deleteEvent(eventId: string) {
    try {
        const result =  await EventModel.findByIdAndDelete({ _id: eventId });

        if(!result) return Promise.reject({ status: 404, message: "Not Found"});

        return result;
    } catch (err) {
        return Promise.reject({ status: 400, message: "Bad Request" });
    }
}