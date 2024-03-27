import EventModel from "../mongo/models/event.model";
import { TEvent } from "../common/types";

type TEventUpdate = {
    title?: string,
    dateStart?: Date,
    dateEnd?: Date,
    address?: string,
    images?: string[],
    coordinates?: [number, number],
    description?: string,
    tag?: string[],
    organizer?: string,
    createdAt?: string | Date,
    updatedAt?: string | Date,
    __v?: number
};

export async function createEvent(eventDetails: TEvent) {
    try {
        return await EventModel.create(eventDetails);
    } catch (err) {
        return Promise.reject({ status: 400, msg: "Bad Request" });
    }
}

export async function findEvent(eventId: string) {
    try {
        const result = await EventModel.findById({ _id: eventId });

        if(!result) return Promise.reject({status: 404, msg: "Not Found"})

        return result;
    } catch (err) {
        return Promise.reject({ status: 400, msg: "Bad Request" });
    }
}

export async function updateEvent(eventId: string, updateDetails: TEventUpdate) {
    try {
        return await EventModel.findByIdAndUpdate(
            {
                _id: eventId
            },
            updateDetails,
            {
                new: true
            }
        );
    } catch(err) {
        return Promise.reject({status: 400, msg: "Bad Request"})
    }
}

export async function deleteEvent(eventId: string) {
    try {
        return await EventModel.findByIdAndDelete({_id: eventId});
    } catch(err) {
        return Promise.reject({status: 400, msg: "Bad Request"});
    }
}