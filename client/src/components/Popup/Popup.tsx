import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom"
import { TReduxUser } from "../../common/types";
import { useEffect, useState } from "react";
import { getEvent } from "../../utils/axios/event";
import { scheduleEvent } from "../../utils/axios/google";
import { MagnifyingGlass } from "react-loader-spinner";
import "../../styles/Popup/popup.scss";
import moment from "moment-timezone";

export default function Popup() {
    const [searchParams] = useSearchParams();
    const eventId = useSelector((state: TReduxUser) => state.buyerDetails.eventId);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        window.resizeTo(450, 200);

        function formatDate(date: Date) {
            const newDate = new Date(date)
            const offsetInMinutes = newDate.getTimezoneOffset() * -1;
            const offsetHours = offsetInMinutes / 60;
            const offsetMinutes = offsetInMinutes - (offsetHours * 60);

            return newDate
                .toISOString()
                .replace(/\..*Z$/, "")
                + "-"
                + "0".repeat(2 - offsetHours.toString().length)
                + offsetHours.toString()
                + "0".repeat(2 - offsetHours.toString().length)
                + offsetMinutes.toString();
        }

        (async () => {
            try {
                const eventDetails = await getEvent(eventId);
                const code = searchParams.get("code");

                const eventSchedule = {
                    summary: eventDetails.title,
                    location: eventDetails.address,
                    description: eventDetails.summary,
                    start: {
                        dateTime: formatDate(eventDetails.dateStart),
                        timeZone: "Europe/London"
                    },
                    end: {
                        dateTime: formatDate(eventDetails.dateEnd),
                        timeZone: "Europe/London"
                    }
                };

                if (eventDetails && code) {
                    const result = await scheduleEvent(eventSchedule, code);
                    if (!result) {

                        setError(true);
                    }
                }
                setLoading(false);

            } catch (err) {
                setLoading(false);
                setError(true);
            }

        })();
    }, []);


    return (
        <div className="popup">
            {
                loading
                    ? (
                        <MagnifyingGlass />
                    )
                    : (
                        <>
                            {
                                error
                                    ? (
                                        <p>Something went wrong{error}</p>
                                    )
                                    : (
                                        <p>Event is now in your calendar</p>
                                    )
                            }
                        </>
                    )
            }
        </div>
    )
}