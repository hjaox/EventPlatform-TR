import { useNavigate } from "react-router-dom"
import { getAllEvents } from "../../utils/axios/events";
import { useEffect, useState } from "react";
import { TEvent } from "../../common/types";

export default function Home() {
    const navigation = useNavigate();
    const [eventList, setEventList] = useState<null | [null] | TEvent[]>(null)

    useEffect(() => {
        (async () => {
            const allEvents = await getAllEvents();
            setEventList(() => [...allEvents]);
        })()

    }, []);
    console.log(eventList)
    return <>
        Homepage
    </>
}