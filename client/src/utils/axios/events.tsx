import instance from "./instance";

export async function getAllEvents() {
    const { data: {allEvents}} = await instance.get("./events");
    return allEvents;
}