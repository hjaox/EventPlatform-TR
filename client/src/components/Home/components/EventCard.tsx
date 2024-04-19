import { TEventCard, TReduxUser } from "../../../common/types";
import { handleDate } from "../../../utils/utils";
import "../../../styles/Home/eventCard.scss"
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { deleteEvent } from "../../../utils/axios/event";
import defaultImage from "../../../assets/default.jpg";
import { downloadImage } from "../../../utils/firebase/functions";
import { useEffect, useState } from "react";
import { ThreeCircles } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RiCheckLine } from "react-icons/ri";
import { RiCloseLine } from "react-icons/ri";

export default function EventCard({ event, setEventList, key, eventsToDisplay }: TEventCard) {
    const [coverPhoto, setCoverPhoto] = useState<string>(defaultImage)
    const [isLoading, setIsLoading] = useState(false);
    const [showConfirmPrompt, setComfirmPrompt] = useState(false);
    const isLoggedIn = useSelector((state: TReduxUser) => state.isLoggedIn);
    const userToken = useSelector((state: TReduxUser) => state.userDetails.accessToken)
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const url = await downloadImage(event._id);

            if (url) {
                setCoverPhoto(url);
            }
            setIsLoading(false);
        })()
    }, [eventsToDisplay]);

    async function handleDeleteEvent(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        e.stopPropagation();
        setComfirmPrompt(true);
    }

    function handleEditEvent(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        e.stopPropagation();
        navigate(`/Event/Edit/${event._id}`)
    }

    async function handleDeletePrompt(choice: boolean) {
        if (choice) {
            setIsLoading(true)
            await deleteEvent(event._id, userToken);

            setEventList(eventList => {
                const newList = eventList.filter((item) => item._id !== event._id);

                return newList;
            })
        }
        setIsLoading(false);
        setComfirmPrompt(false);
    }

    return (
        <li key={key} className="home-events-list-item">
            {
                showConfirmPrompt && (
                    <div className="confirmPrompt-container">
                        <div className="confirmPrompt-display">
                            <div className="confirmPrompt-message">Delete event?</div>
                            <div className="confirmPrompt-options">
                                <div className="confirmPropmt-option-container" onClick={() => handleDeletePrompt(false)}>
                                    <RiCloseLine className="confirmPropmt-icon" />
                                </div>
                                <div className="confirmPropmt-option-container">
                                    <RiCheckLine className="confirmPropmt-icon" onClick={() => handleDeletePrompt(true)} />
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            {
                !isLoading
                    ? (
                        <div className="event-container" onClick={() => navigate(`/Event/${event._id}`)}>
                            <img className="eventCard-image" src={coverPhoto} alt="pic" />
                            <div className="eventCard-texts">
                                <h1 className="eventCard-title">{event.title}</h1>
                                <span className="eventCard-startDate">{handleDate(event.dateStart)}</span>
                                <span className="eventCard-address">{event.address}</span>
                                <span className="eventCard-tag">{event.summary}</span>
                            </div>
                            {
                                isLoggedIn && (
                                    <div className="eventCard-option-container">
                                        <div className="eventCard-icon-container" onClick={handleEditEvent}>
                                            <FaRegEdit className="eventCard-option" />
                                        </div>

                                        <div className="eventCard-icon-container" onClick={handleDeleteEvent}>
                                            <MdDeleteForever className="eventCard-option" />
                                        </div>
                                    </div>
                                )
                            }
                        </div>

                    )
                    : (
                        <div className="loading-eventCard">
                            <ThreeCircles color="purple" />
                        </div>

                    )
            }
        </li>
    )
}