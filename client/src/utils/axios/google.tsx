import instance from "./instance";

type TEventSchedule = {
    summary: string,
    location: string,
    description: string,
    start: {
        dateTime: string,
        timeZone: string,
    },
    end: {
        dateTime: string,
        timeZone: string,
    }
};

export async function getOauthConsent() {
    const { data: { url } } = await instance.get("/google/oauth2callback");

    return url;
}

export async function scheduleEvent(eventSchedule: TEventSchedule, code: string) {
    try {
        const { status } = await instance.post("/google/schedule-event", {
            code,
            eventSchedule
        })

        if (status === 201) {
            return true;
        }

        return false;
    } catch (err) {
        return false;
    }

}