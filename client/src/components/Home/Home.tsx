import "../../styles/Home/home.scss"
import { useNavigate } from "react-router-dom"
import { getAllEvents } from "../../utils/axios/events";
import { useEffect, useState } from "react";
import { TEvent } from "../../common/types";
import Header from "../subcomponents/Header/Header";
import Footer from "../subcomponents/Footer/Footer";
import { getAllTags } from "../../utils/axios/tags";

import { GiMicrophone } from "react-icons/gi";
import { FaList } from "react-icons/fa";
import { MdPets } from "react-icons/md";
import { BsFilm } from "react-icons/bs";
import { GoBook } from "react-icons/go";
import { TbRun } from "react-icons/tb";
import { MdOutlineSportsSoccer } from "react-icons/md";
import { PiPlantLight } from "react-icons/pi";
import { GrGroup } from "react-icons/gr";

export default function Home() {
    const navigation = useNavigate();
    const [tagParam, setTagParam] = useState<string>("All");
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
                    <span className="home-tags-list-item-icon">{getIcon(tag)}</span>
                    <span className="home-tags-list-item-text">{tag}</span>
                </li>
            )
        })
    }

    function getIcon(item: string) {
        switch (item) {
            case "Music":
                return <GiMicrophone size={30} />;
            case "Pets":
                return <MdPets size={30} />;
            case "Films":
                return <BsFilm size={30} />;
            case "Books":
                return <GoBook size={30} />;
            case "Outdoor":
                return <TbRun size={30} />;
            case "Sports":
                return <MdOutlineSportsSoccer size={30} />;
            case "Plants":
                return <PiPlantLight size={30} />
            case "Community":
                return <GrGroup size={30} />
            default:
                return <FaList size={30} />;
        }
    }

    function handleEventsToDisplay(eventList: TEvent[]) {
        return eventList.map((event, i) => {
            return (
                <li key={i} className="home-events-list-item">
                    <img className="home-events-list-item-image" src={event.images[0]} alt="pic" />
                    <div className="home-events-list-item-text">
                        <h1 className="title">{event.title}</h1>
                        <span className="dateStart">{event.dateStart.toString()}</span>
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