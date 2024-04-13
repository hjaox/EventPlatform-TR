import instance from "./instance";

type TEventSchedule = {
    summary: string,
    location: string,
    description: string,
    start: {
        dateTime: Date,
        timeZone: string,
    },
    end: {
        dateTime: Date,
        timeZone: string,
    }
};

export async function getOauthConsent() {
    const { data: { url } } = await instance.get("/google/oauth2callback");

    return url;
}

export async function scheduleEvent(eventSchedule: TEventSchedule, code: string) {
    const { status } = await instance.post("/google/schedule-event", {
        code,
        eventSchedule
    })

    if (status === 201) return true;

    return false;
}