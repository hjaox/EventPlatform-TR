import Header from "../subcomponents/Header/Header";
import Footer from "../subcomponents/Footer/Footer";
import "../../styles/OrganizeEvent/organizeEvent.scss";
import { useState } from "react";
import { Editor, EditorState } from "draft-js";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createEvent } from "../../utils/axios/event";

export default function OrganizeEvent() {
    const [image, setImage] = useState<any>("")
    const [testing, setTest] = useState<any>("")

    const [expandHeader, setExpandHeader] = useState(false);
    const [expandAbout, setExpandAbout] = useState(false);
    const [expandDateLocation, setExpandDateLocation] = useState(false);

    const [editorTitleState, setEditorTitleState] = useState(() => EditorState.createEmpty());
    const [editorSummaryState, setEditorSummaryState] = useState(() => EditorState.createEmpty());
    const [editorAddressState, setEditorAddressState] = useState(() => EditorState.createEmpty());
    const [editorDetailsState, setEditorDetailsState] = useState(() => EditorState.createEmpty());
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [price, setPrice] = useState("0.03");
    const [tag, setTag] = useState("Others");

    function test(e: any) {
        const object = URL.createObjectURL(e.target.files[0])
        setTest(object)
        setImage(e.target.files)
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const event = {
            title: editorTitleState.getCurrentContent().getPlainText("\u000A"),
            dateStart: startDate,
            dateEnd: endDate,
            address: editorAddressState.getCurrentContent().getPlainText("\u000A"),
            images: [],
            details: editorDetailsState.getCurrentContent().getPlainText("\u000A"),
            summary: editorDetailsState.getCurrentContent().getPlainText("\u000A"),
            tag: [tag],
            price: Number(price)
        }
        console.log("event from client")
        console.log("event from server: ",await createEvent(event));
    }

    return (
        <section className="organize-page">
            <Header />

            <section className="form-container">
                <h1 className="form-header">Create an event</h1>

                <form id="create-form" onSubmit={handleSubmit}>
                    <section className="form-item image-container">
                        <label htmlFor="input-image">Upload a cover photo:</label>
                        <input type="file" id="input-image" onChange={test} />
                        <img src={testing} alt="" />
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
                                            <div className="input-container">
                                                <h4>Price</h4>
                                                <span>£ </span>
                                                <input type="number" id="input-price" min={1} step={0.01} onChange={e => setPrice(e.target.value)} />
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

                    <button form="create-form">Save and Create</button>
                </form>
            </section >
            <Footer />
        </section >
    )
}