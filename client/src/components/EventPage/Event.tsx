import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEvent } from "../../utils/axios/event";
import { TEvent } from "../../common/types";

export default function Event() {
    const { eventId } = useParams();
    const [eventDetails, setEventDetails] = useState<null | TEvent>(null);

    useEffect(() => {
        if (eventId) {
            (async () => {
                const result = await getEvent(eventId);
                setEventDetails(() => ({ ...result }));
            })();
        }

    }, []);
    console.log(eventDetails)
    return (
        <section className="event-page">

        </section>
    )
}