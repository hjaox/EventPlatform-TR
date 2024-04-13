import "../../styles/Home/home.scss"
import { useNavigate } from "react-router-dom"
import { getAllEvents } from "../../utils/axios/events";
import { useEffect, useState } from "react";
import { TEvent } from "../../common/types";
import Header from "../subcomponents/Header/Header";
import Footer from "../subcomponents/Footer/Footer";
import { getAllTags } from "../../utils/axios/tags";
import EventCard from "./components/EventCard";
import TagCard from "./components/TagCard";
import { MagnifyingGlass } from "react-loader-spinner";

export default function Home() {
    const navigate = useNavigate();
    const [eventList, setEventList] = useState<TEvent[]>([]);
    const [tagList, setTagList] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        (async () => {
            const results = await Promise.all([getAllEvents(), getAllTags()]);
            setEventList(() => [...results[0], ...results[0], ...results[0]]);
            setTagList(() => [...results[1]]);
            setIsLoading(false);
        })()

    }, []);

    useEffect(() => {
    }, [eventList])

    function handleTags(tagList: string[]) {
        return tagList.map((tag, i) => {
            return (
                <li key={i} className="home-tags-list-item">
                    <TagCard tag={tag} />
                </li>
            )
        })
    }

    function handleEventsToDisplay(eventList: TEvent[]) {
        return eventList.map((event, i) => {
            return (
                <li onClick={() => navigate(`/Event/${event._id}`)} key={i} className="home-events-list-item">
                    <EventCard event={event}
                        eventList={eventList}
                        setEventList={setEventList} />

                </li>
            )
        })
    }

    return (
        <section className="home-page">
            <Header />
            <section className="home-display">
                {
                    isLoading
                        ? (
                            <div className="loading">
                                <MagnifyingGlass color="purple" />
                            </div>
                        )
                        : (
                            <>
                                <div className="home-tags">
                                    <ul className="home-tags-list">
                                        {
                                            handleTags(tagList)
                                        }
                                    </ul>
                                </div>

                                {
                                    eventList.length
                                        ? (
                                            <div className="home-events">
                                                <ul className="home-events-list">
                                                    {
                                                        handleEventsToDisplay(eventList)
                                                    }
                                                </ul>

                                            </div>
                                        )
                                        : (
                                            <div className="no-events">
                                                <p>No events available</p>
                                            </div>
                                        )
                                }
                            </>

                        )
                }
            </section>
            <Footer />
        </section>
    )
}