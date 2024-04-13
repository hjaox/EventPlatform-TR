import { TEvent } from "../../../common/types";
import { handleDate } from "../../../utils/utils";
import "../../../styles/Home/eventCard.scss"
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { deleteEvent } from "../../../utils/axios/event";
import defaultImage from "../../../assets/default.jpg";
import { downloadImage } from "../../../utils/firebase/functions";
import { useEffect, useState } from "react";
import { MagnifyingGlass } from "react-loader-spinner";

export default function EventCard({ event, setEventList }: {
    event: TEvent,
    eventList: TEvent[],
    setEventList: React.Dispatch<React.SetStateAction<TEvent[]>>
}) {
    const [coverPhoto, setCoverPhoto] = useState<string>(defaultImage)
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        (async () => {
            setIsLoading(true)
            const url = await downloadImage(event._id);

            if (url) {
                setCoverPhoto(url);
            }
            setIsLoading(false);
        })()
    }, []);

    async function handleDeleteEvent(e: React.MouseEvent<HTMLDivElement, MouseEvent>, eventId: string) {
        e.stopPropagation();

        await deleteEvent(eventId);

        setEventList(eventList => {
            const index = eventList.findIndex(event => event._id === eventId);
            const newList = eventList.filter((_, i) => i !== index);

            return newList;
        })
    }

    return (
        <>
            {
                !isLoading
                    ? (
                        <>
                            <img className="eventCard-image" src={coverPhoto} alt="pic" />
                            <div className="eventCard-texts">
                                <h1 className="eventCard-title">{event.title}</h1>
                                <span className="eventCard-startDate">{handleDate(event.dateStart)}</span>
                                <span className="eventCard-address">{event.address}</span>
                                <span className="eventCard-tag">{event.summary}</span>
                            </div>
                            <div className="eventCard-option-container">
                                <div className="eventCard-icon-container">
                                    <FaRegEdit className="eventCard-option" />
                                </div>

                                <div className="eventCard-icon-container" onClick={e => handleDeleteEvent(e, event._id)}>
                                    <MdDeleteForever className="eventCard-option" />
                                </div>
                            </div>
                        </>

                    )
                    : (
                        <div className="loading">
                            <MagnifyingGlass color="purple"/>
                        </div>

                    )
            }
        </>
    )
}