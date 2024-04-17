import "../../styles/Home/home.scss"
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
    const [eventList, setEventList] = useState<TEvent[]>([]);
    const [eventsToDisplay, setEventsToDisplay] = useState<TEvent[]>([]);
    const [tagList, setTagList] = useState<string[]>(["All"]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedTag, setSelectedTag] = useState("All");
    const [error, setError] = useState(false);

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            try {
                const results = await Promise.all([getAllEvents(), getAllTags()]);
                setEventList(() => [...results[0]]);
                setEventsToDisplay(() => [...results[0]]);
                setTagList(tagList => [...tagList, ...results[1]]);
                setIsLoading(false);
            } catch {
                setError(true);
                setIsLoading(false)
            }
        })();
    }, []);

    useEffect(() => {
        if (selectedTag === "All") {
            setEventsToDisplay(() => [...eventList]);
        } else {
            setEventsToDisplay(() => [...eventList.filter(event => event.tag === selectedTag)]);
        }
    }, [eventList, selectedTag]);

    function handleTags(tagList: string[]) {
        return tagList.map((tag, i) => {
            return (
                <TagCard tag={tag}
                    setSelectedTag={setSelectedTag}
                    selectedTag={selectedTag}
                    key={i}
                />
            )
        })
    }

    function handleEventsToDisplay(eventList: TEvent[]) {
        return eventList.map((event, i) => {
            return (
                    <EventCard event={event}
                        eventList={eventList}
                        setEventList={setEventList}
                        key={i} />
            )
        })
    }

    return (
        <section className="home-page">
            <Header />
            {
                    error && (
                        <div className="home-error">
                            <div className="home-error-message">
                                Something went wrong. Please refresh the page.
                            </div>
                        </div>
                    )
                }

            <section className="home-display">

                {
                    isLoading
                        ? (
                            <div className="loading-page">
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
                                {}
                                {
                                    eventsToDisplay.length
                                        ? (
                                            <div className="home-events">
                                                <ul className="home-events-list">
                                                    {
                                                        handleEventsToDisplay(eventsToDisplay)
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