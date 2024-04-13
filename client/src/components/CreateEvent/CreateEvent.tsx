import Header from "../subcomponents/Header/Header";
import Footer from "../subcomponents/Footer/Footer";
import "../../styles/CreateEvent/createEvent.scss";
import React, { useState } from "react";
import { EditorState } from "draft-js";
import "react-datepicker/dist/react-datepicker.css";
import { uploadToFirebase } from "../../utils/firebase/functions";
import file from "../../assets/default.jpg";
import { TEvent } from "../../common/types";
import { useNavigate } from "react-router-dom";
import ImageForm from "./components/ImageForm";
import EventHeaderForm from "./components/EventHeaderForm";
import DateAndLocationForm from "./components/DateAndLocationForm";
import AboutForm from "./components/AboutForm";
import { createEvent } from "../../utils/axios/event";

export default function CreateEvent() {
    const navigate = useNavigate();

    //style and functionality of display page
    const [expandHeader, setExpandHeader] = useState(false);
    const [expandAbout, setExpandAbout] = useState(false);
    const [expandDateLocation, setExpandDateLocation] = useState(false);
    const [imageDisplay, setImageDisplay] = useState(file);
    const [redirect, setRedirect] = useState(false);
    const [newEvent, setNewEvent] = useState<null | TEvent>(null);
    const [error, setError] = useState(false);

    //form data
    const [editorTitleState, setEditorTitleState] = useState(() => EditorState.createEmpty());
    const [editorSummaryState, setEditorSummaryState] = useState(() => EditorState.createEmpty());
    const [editorAddressState, setEditorAddressState] = useState(() => EditorState.createEmpty());
    const [editorDetailsState, setEditorDetailsState] = useState(() => EditorState.createEmpty());
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [price, setPrice] = useState(0.3);
    const [tag, setTag] = useState("Others");
    const [imageFile, setImageFile] = useState<null | File>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        let url = "https://firebasestorage.googleapis.com/v0/b/eventplatform-tr.appspot.com/o/images%2Fdefault.jpg?alt=media&token=2106f36d-e843-4fea-b8b9-a5ab06ec3787";


        const event = {
            title: editorTitleState.getCurrentContent().getPlainText("\u000A"),
            dateStart: startDate,
            dateEnd: endDate,
            address: editorAddressState.getCurrentContent().getPlainText("\u000A"),
            images: [url],
            isFree: false,
            openPrice: false,
            details: editorDetailsState.getCurrentContent().getPlainText("\u000A"),
            summary: editorDetailsState.getCurrentContent().getPlainText("\u000A"),
            tag: [tag],
            price
        }

        try {
            const newEvent = await createEvent(event);

            if (imageDisplay !== "/src/assets/default.jpg" && imageFile) {
                const result = await uploadToFirebase(imageFile, newEvent._id);

                if (result) url = result;
            }

            setNewEvent(newEvent);
            setRedirect(true);
        } catch (err) {
            setError(true);
        }
    }

    return (
        <section className="organize-page">
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
                error && (
                    <>error</>
                )
            }

            <section className="form-container">

                <h1 className="form-header">Create an Event</h1>

                <form id="create-form" onSubmit={handleSubmit}>
                    {
                        <ImageForm
                            imageDisplay={imageDisplay}
                            setImageDisplay={setImageDisplay}
                            setImageFile={setImageFile} />
                    }
                    <section className="form-item header-container">
                        {
                            expandHeader
                                ? (
                                    <>
                                        {
                                            <EventHeaderForm
                                                setEditorTitleState={setEditorTitleState}
                                                editorTitleState={editorTitleState}
                                                setEditorSummaryState={setEditorSummaryState}
                                                editorSummaryState={editorSummaryState}
                                                price={price}
                                                setPrice={setPrice}
                                            />
                                        }
                                    </>

                                )
                                : (
                                    <div className="header-short" onClick={() => setExpandHeader(true)}>
                                        <h2>Event Header</h2>
                                        <p>Attendees will see these details at the top of your event page.</p>
                                    </div>
                                )
                        }
                    </section>

                    <section className="form-item datelocation-container" onClick={() => setExpandDateLocation(true)}>
                        <div className="datelocation-short">
                            <h2>Date and Location</h2>
                            <p>Set a date, time and location for your event.</p>
                        </div>
                        {
                            expandDateLocation && (
                                <>
                                    {
                                        <DateAndLocationForm
                                            startDate={startDate}
                                            setStartDate={setStartDate}
                                            endDate={endDate}
                                            setEndDate={setEndDate}
                                            editorAddressState={editorAddressState}
                                            setEditorAddressState={setEditorAddressState} />
                                    }
                                </>
                            )
                        }
                    </section>

                    <section className="form-item about-container" onClick={() => setExpandAbout(true)}>
                        <h2>About this event</h2>
                        <p className="padding-bottom">Use this section to tell members of the community more details about this event.</p>
                        {

                            expandAbout && (
                                <>
                                    {
                                        <AboutForm
                                            editorDetailsState={editorDetailsState}
                                            setEditorDetailsState={setEditorDetailsState}
                                            setTag={setTag} />
                                    }</>
                            )
                        }
                    </section>
                    <button form="create-form">Save and Create</button>
                </form>
            </section >
            <Footer />
        </section >
    )
}