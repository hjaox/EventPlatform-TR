import Header from "../subcomponents/Header/Header";
import Footer from "../subcomponents/Footer/Footer";
import "../../styles/CreateEvent/createEvent.scss"
import { useEffect, useState } from "react";
import { TEvent } from "../../common/types";
import { useNavigate, useParams } from "react-router-dom";
import { Rings } from "react-loader-spinner";
import { IoMdClose } from "react-icons/io";
import EventForm from "./EventForm/EventForm";
import { getEvent } from "../../utils/axios/event";


export default function CreateEvent() {
    const navigate = useNavigate();
    const { eventId } = useParams();

    //style and functionality of display page
    const [redirect, setRedirect] = useState(false);
    const [newEvent, setNewEvent] = useState<null | TEvent>(null);
    const [isLoading, setIsLoading] = useState(false);

    const [eventToEdit, setEventToEdit] = useState<null | TEvent>(null)

    //errors
    const [createEventError, setCreateEventError] = useState(false);

    useEffect(() => {
        (async () => {
            if (eventId) {
                try {
                    const eventDetails = await getEvent(eventId);
                    setEventToEdit(eventDetails);
                } catch {
                    navigate("/Error")
                }
            } else {
                navigate("/Error")
            }
        })()
    }, []);

    return (
        <section className="create-page">
            <Header />
            {
                redirect && (
                    <section className="redirect-container">
                        <div className="redirect">
                            <p>You have successfully created an event. 🎉</p>
                            <div className="redirect-options">
                                <button onClick={() => navigate("/Home")}>Go Home</button>
                                <button onClick={() => navigate(`/Event/${newEvent?._id}`)}>View Event</button>
                            </div>
                        </div>

                    </section>
                )
            }
            {
                createEventError && (
                    <div className="createEventError">
                        <div className="createEventError-message">Something went wrong. Please try again.
                            <IoMdClose onClick={() => setCreateEventError(false)} className="createEventError-close" />
                        </div>
                    </div>
                )
            }
            {
                isLoading && (
                    <div className="loading">
                        <div className="loading-message">
                            <Rings color="purple" />
                        </div>
                    </div>
                )
            }
            <section className="form-container">

                <h1 className="form-header">Edit your Event</h1>
                {
                    <EventForm
                        setIsLoading={setIsLoading}
                        setNewEvent={setNewEvent}
                        setRedirect={setRedirect}
                        setCreateEventError={setCreateEventError}
                        eventToEdit={eventToEdit}
                        setEventToEdit={setEventToEdit} />
                }
            </section >
            <Footer />
        </section >
    )
}