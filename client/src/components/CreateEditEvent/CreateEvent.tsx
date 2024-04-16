import Header from "../subcomponents/Header/Header";
import Footer from "../subcomponents/Footer/Footer";
import "../../styles/CreateEvent/createEvent.scss";
import { useState } from "react";
import { TEvent } from "../../common/types";
import { useNavigate } from "react-router-dom";
import { Rings } from "react-loader-spinner";
import { IoMdClose } from "react-icons/io";
import EventForm from "./EventForm/EventForm";


export default function CreateEvent() {
    const navigate = useNavigate();

    //style and functionality of display page
    const [redirect, setRedirect] = useState(false);
    const [newEvent, setNewEvent] = useState<null | TEvent>(null);
    const [isLoading, setIsLoading] = useState(false);

    //errors
    const [createEventError, setCreateEventError] = useState(false);

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
                        <IoMdClose onClick={() => setCreateEventError(false)} className="createEventError-close"/>
                        </div>
                    </div>
                )
            }
            {
                isLoading && (
                    <div className="loading">
                        <div className="loading-message">
                            <Rings color="purple"/>
                        </div>
                    </div>
                )
            }
            <section className="form-container">

                <h1 className="form-header">Create an Event</h1>
                {
                    <EventForm
                    setIsLoading={setIsLoading}
                    setNewEvent={setNewEvent}
                    setRedirect={setRedirect}
                    setCreateEventError={setCreateEventError} />
                }
            </section >
            <Footer />
        </section >
    )
}