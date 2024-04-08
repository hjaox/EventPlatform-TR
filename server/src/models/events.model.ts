import EventModel from "../mongo/models/event.model";

export async function fetchAllEvents() {
    try {
        return await EventModel.find({});
    } catch(err) {
        return Promise.reject({status: 400, message: "Bad request"})
    }
}