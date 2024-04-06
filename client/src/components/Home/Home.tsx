import "../../styles/Home/home.scss"
import { useNavigate } from "react-router-dom"
import { getAllEvents } from "../../utils/axios/events";
import { useEffect, useState } from "react";
import { TEvent } from "../../common/types";
import Header from "../subcomponents/Header/Header";
import Footer from "../subcomponents/Footer/Footer";
import { getAllTags } from "../../utils/axios/tags";
import { getIcon, handleDate } from "../../utils/utils";

export default function Home() {
    const navigation = useNavigate();
    const [eventList, setEventList] = useState<null | TEvent[]>(null);
    const [tagList, setTagList] = useState<null | string[]>(null);

    useEffect(() => {
        (async () => {
            const results = await Promise.all([getAllEvents(), getAllTags()]);
            setEventList(() => [...results[0], ...results[0], ...results[0]]);
            setTagList(() => [...results[1]]);
        })()

    }, []);

    function handleTags(tagList: string[]) {
        return tagList.map((tag, i) => {
            return (
                <li key={i} className="home-tags-list-item">
                    <span className="icon-container">{getIcon(tag)}</span>
                    <span className="text">{tag}</span>
                </li>
            )
        })
    }

    function navigateToEvent(eventId: string) {
        navigation(`/Event/${eventId}`);
    }

    function handleEventsToDisplay(eventList: TEvent[]) {
        return eventList.map((event, i) => {
            return (
                <li  onClick={() => navigateToEvent(event._id)} key={i} className="home-events-list-item">
                    <img className="home-events-list-item-image" src={event.images[0]} alt="pic" />
                    <div className="home-events-list-item-text">
                        <h1 className="title">{event.title}</h1>
                        <span className="dateStart">{handleDate(event.dateStart)}</span>
                        <span className="address">{event.address}</span>
                        <span className="tag">{event.tag}</span>
                        <span className="organizer">{event.organizer}</span>
                    </div>

                </li>
            )
        })
    }

    return (
        <section className="home-page">
            <Header />
            <section className="home-display">
                {
                    !tagList
                        ? (
                            <div>loading</div>
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
                                    !eventList
                                        ? (
                                            <>loading</>
                                        )
                                        : (
                                            <div className="home-events">
                                                <ul className="home-events-list">
                                                    {
                                                        handleEventsToDisplay(eventList)
                                                    }
                                                </ul>

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