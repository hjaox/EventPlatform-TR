import "../../styles/Home/home.scss"
import { useNavigate } from "react-router-dom"
import { getAllEvents } from "../../utils/axios/events";
import { useEffect, useState } from "react";
import { TEvent } from "../../common/types";
import Header from "../subcomponents/Header/Header";
import Footer from "../subcomponents/Footer/Footer";

export default function Home() {
    const navigation = useNavigate();
    const [eventList, setEventList] = useState<null | [null] | TEvent[]>(null)

    useEffect(() => {
        (async () => {
            const allEvents = await getAllEvents();
            setEventList(() => [...allEvents]);
        })()

    }, []);

    function handleEventList() {

    }

    return (
        <section className="home-page">
            <Header />
            <section className="home-display">
                <div>
                    tags
                </div>
                <div>
                    events display
                </div>
            </section>
            <Footer />
        </section>
    )
}