import Header from "../subcomponents/Header/Header";
import Footer from "../subcomponents/Footer/Footer";
import "../../styles/EditEvent/editEvent.scss";
import React, { useEffect, useState } from "react";
import { ContentState, Editor, EditorState } from "draft-js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createEvent, getEvent } from "../../utils/axios/event";
import { uploadToFirebase } from "../../utils/firebase/functions";
import file from "../../assets/default.jpg"
import { MdOutlineUploadFile } from "react-icons/md";
import { useSelector } from "react-redux";
import { TEvent, TReduxUser } from "../../common/types";
import { useNavigate, useParams } from "react-router-dom";

export default function EditEvent() {
    const { uid } = useSelector((state: TReduxUser) => state.userDetails);
    const navigate = useNavigate();
    const { eventId } = useParams();

    //style and functionality of display page
    const [expandHeader, setExpandHeader] = useState(false);
    const [expandAbout, setExpandAbout] = useState(false);
    const [expandDateLocation, setExpandDateLocation] = useState(false);
    const [image, setImage] = useState(file);
    const [redirect, setRedirect] = useState(false);
    const [newEvent, setNewEvent] = useState<null | TEvent>(null);

    //errors

    //form data
    const [editorTitleState, setEditorTitleState] = useState(() => EditorState.createEmpty());
    const [editorSummaryState, setEditorSummaryState] = useState(() => EditorState.createEmpty());
    const [editorAddressState, setEditorAddressState] = useState(() => EditorState.createEmpty());
    const [editorDetailsState, setEditorDetailsState] = useState(() => EditorState.createEmpty());
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [price, setPrice] = useState(0);
    const [openPrice, setOpenPrice] = useState(false);
    const [tag, setTag] = useState("Others");

    //cover photo value to upload
    const [imageFile, setImageFile] = useState<null | File>(null);

    useEffect(() => {
        (async () => {

            if (eventId) {
                try {
                    const eventDetails = await getEvent(eventId);

                    setEditorTitleState(EditorState.createWithContent(ContentState.createFromText(eventDetails.title)));
                    setEditorSummaryState(EditorState.createWithContent(ContentState.createFromText(eventDetails.summary)));
                    setEditorAddressState(EditorState.createWithContent(ContentState.createFromText(eventDetails.address)));
                    setEditorDetailsState(EditorState.createWithContent(ContentState.createFromText(eventDetails.details)));
                    setPrice(Number(eventDetails.price));
                    setOpenPrice(eventDetails.openPrice)
                    setStartDate(eventDetails.dateStart);
                    setEndDate(eventDetails.dateEnd);
                    setTag(eventDetails.tag[0]);


                } catch {
                    navigate("/Error")
                }

            } else {
                navigate("/Error")
            }
        })()

    }, []);



    function handleCoverPhoto(e: React.FormEvent<HTMLLabelElement>) {
        const event = e.target as HTMLInputElement

        if (event.files) {
            const uploadedImg = URL.createObjectURL(event.files[0]);
            setImage(uploadedImg);
            setImageFile(event.files[0])
        }
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        let url = "https://firebasestorage.googleapis.com/v0/b/eventplatform-tr.appspot.com/o/images%2Fdefault.jpg?alt=media&token=2106f36d-e843-4fea-b8b9-a5ab06ec3787";

        if (image !== "/src/assets/default.jpg" && imageFile) {
            const result = await uploadToFirebase(imageFile, uid);

            if (result) url = result;
        }

        const event = {
            title: editorTitleState.getCurrentContent().getPlainText("\u000A"),
            dateStart: startDate,
            dateEnd: endDate,
            address: editorAddressState.getCurrentContent().getPlainText("\u000A"),
            images: url,
            details: editorDetailsState.getCurrentContent().getPlainText("\u000A"),
            summary: editorDetailsState.getCurrentContent().getPlainText("\u000A"),
            tag: tag,
            price,
            openPrice
        }
        try {
            const newEvent = await createEvent(event);
            setNewEvent(newEvent);
            setRedirect(true);
        } catch (err) {

        }
    }

    return (
        <section className="edit-page">
            <Header />
            {
                redirect && (
                    <section className="redirect-container">
                        <div className="redirect">
                            <p>Changes saved. 🎉</p>
                            <div className="redirect-options">
                                <button onClick={() => navigate("/Home")}>Go Home</button>
                                <button onClick={() => navigate(`/Event/${newEvent?._id}`)}>View Event</button>
                            </div>
                        </div>

                    </section>
                )
            }

            <section className="form-container">

                <h1 className="form-header">Edit your Event</h1>

                <form id="create-form" onSubmit={handleSubmit}>
                    <section className="image-container">
                        <h3>Cover Photo</h3>
                        <p className="padding-bottom">You may upload a cover photo that will be displayed at the top of your event page.You will be given a default picture if none is uploaded.</p>
                        <div className="input-container">
                            <label onChange={handleCoverPhoto} htmlFor="input-image" className="icon-container">
                                <input type="file" id="input-image" hidden />
                                <div className="upload-icon">
                                    <MdOutlineUploadFile className="icon" />
                                    <span className="text">Upload Photo</span>
                                </div>
                            </label>
                            <img src={image} alt="default picture" />
                        </div>
                    </section>

                    <section className="form-item header-container">
                        {
                            expandHeader
                                ? (
                                    <div className="header-expanded">
                                        <div className="header-title">
                                            <h3>Event Title</h3>
                                            <p>Make a title that is clear and concise to tell people what your event is about.</p>
                                            <div className="input-container">
                                                <h4>Event title</h4>
                                                <Editor blockStyleFn={() => "input"} editorState={editorTitleState} onChange={setEditorTitleState} />
                                            </div>
                                        </div>

                                        <div className="header-summary">
                                            <h3>Summary</h3>
                                            <p>Grab people's attention with a short description about your event. Attendees will see this at the top of the event page with the event title. (140 characters max)</p>
                                            <div className="input-container">
                                                <h4>Summary</h4>
                                                <Editor blockStyleFn={() => "input"} editorState={editorSummaryState} onChange={setEditorSummaryState} />
                                            </div>

                                        </div>

                                        <div className="header-price">
                                            <h3>Price</h3>
                                            <p>Set a price for your event. The minimum price allowed is £0.03. You can also make the event free. The open price option gives the attendees the freedom of how much they would want to pay for the event.</p>
                                            <div className="input-container">
                                                <h4>Price</h4>
                                                <span>£ </span>
                                                <input type="number" id="input-price" min={1} step={0.01} onChange={e => setPrice(Number(e.target.value))} />
                                            </div>

                                        </div>
                                    </div>
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
                                <div className="datelocation-expanded">
                                    <div className="datelocation-dateStart">
                                        <h3>Start Date</h3>
                                        <div className="input-container">
                                            <h4>Start Date</h4>
                                            <DatePicker selected={startDate} onChange={(date) => {
                                                if (date) {
                                                    setStartDate(date)
                                                }
                                            }} wrapperClassName="date-picker" />
                                        </div>

                                    </div>

                                    <div className="datelocation-dateEnd">
                                        <h3>End Date</h3>
                                        <div className="input-container">
                                            <h4>End Date</h4>
                                            <DatePicker selected={endDate} onChange={(date) => {
                                                if (date) {
                                                    setEndDate(date)
                                                }
                                            }} wrapperClassName="date-picker" />
                                        </div>

                                    </div>

                                    <div className="datelocation-address">
                                        <h3>Address</h3>
                                        <div className="input-container">
                                            <h4>Address</h4>
                                            <Editor blockStyleFn={() => "input"} editorState={editorAddressState} onChange={setEditorAddressState} />
                                        </div>

                                    </div>
                                </div>

                            )

                        }
                    </section>

                    <section className="form-item about-container" onClick={() => setExpandAbout(true)}>
                        <h2>About this event</h2>
                        <p className="padding-bottom">Use this section to tell members of the community more details about this event.</p>
                        {

                            expandAbout && (
                                <div className="about-expanded">
                                    <div className="about-details">
                                        <h3>Details</h3>
                                        <p>Add more details about your event and inlude what people can expect if they attend. You can inlude an event itinerary, venue information, parking, accessibility options, etc. </p>
                                        <div className="input-container">
                                            <h4>Details</h4>
                                            <Editor blockStyleFn={() => "input"} editorState={editorDetailsState} onChange={setEditorDetailsState} />
                                        </div>
                                    </div>

                                    <div className="about-tag">
                                        <h3>Tag</h3>
                                        <p>Select what type is your event. It will be categorized as "Others" if none is selected.</p>
                                        <div className="input-container">
                                            <h4>Tag</h4>
                                            <select name="tags" id="tag-select" onChange={e => setTag(e.target.value)}>
                                                <option value="Others">--Please choose a tag--</option>
                                                <option value="Music">Music</option>
                                                <option value="Pets">Pets</option>
                                                <option value="Films">Films</option>
                                                <option value="Books">Books</option>
                                                <option value="Outdoor">Outdoor</option>
                                                <option value="Sports">Sports</option>
                                                <option value="Plants">Plants</option>
                                                <option value="Community">Community</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </section>

                    <button form="create-form">Save changes</button>
                </form>
            </section >
            <Footer />
        </section >
    )
}