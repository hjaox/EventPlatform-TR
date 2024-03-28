import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEvent } from "../../utils/axios/event";
import { TEvent } from "../../common/types";
import Header from "../subcomponents/Header/Header";
import Footer from "../subcomponents/Footer/Footer";
import "../../styles/EventPage/event.scss";

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

    function handleDateAndTime(dateStart: Date, dateEnd: Date) {
        return <></>
    }

    function handleLocation(address: string, coords: number[]) {

    }

    return (
        <section className="event-page">
            <Header />

            {
                !eventDetails
                    ? (
                        <>loading</>
                    )
                    : (
                        <section className="event-display">
                            <img  className="image" src={eventDetails.images[0]} alt="pic" />
                            <h1 className="title">{eventDetails.title}</h1>
                            <div className="time">{handleDateAndTime(eventDetails.dateStart, eventDetails.dateEnd)}</div>
                            <div className="location"></div>
                            <div className="details"></div>
                            <div className="organizer"></div>
                        </section>
                    )
            }

            <Footer />
        </section >
    )
}