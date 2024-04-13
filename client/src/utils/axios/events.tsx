import instance from "./instance";

export async function getAllEvents() {
    try {
        const { data: { allEvents } } = await instance.get("./events");
        if (allEvents) return allEvents;
        return null
    } catch (err) {
        return null
    }
}