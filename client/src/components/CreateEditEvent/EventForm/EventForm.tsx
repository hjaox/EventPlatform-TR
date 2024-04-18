import { ContentState, EditorState } from "draft-js";
import { useEffect, useState } from "react";
import { TEventForm, TNewEvent } from "../../../common/types";
import file from "../../../assets/default.jpg";
import { uploadToFirebase } from "../../../utils/firebase/functions";
import { createEvent, editEvent } from "../../../utils/axios/event";
import ImageForm from "./components/ImageForm";
import EventHeaderForm from "./components/EventHeaderForm";
import { LiaExclamationCircleSolid } from "react-icons/lia";
import DateAndLocationForm from "./components/DateAndLocationForm";
import AboutForm from "./components/AboutForm";
import { fetchDefaultImage } from "../../../utils/utils";

export default function EventForm({ eventToEdit, setIsLoading, setNewEvent, setRedirect, setCreateEventError }: TEventForm) {
    const [expandHeader, setExpandHeader] = useState(false);
    const [expandAbout, setExpandAbout] = useState(false);
    const [expandDateLocation, setExpandDateLocation] = useState(false);
    const [imageDisplay, setImageDisplay] = useState(file);

    const [formError, setFormError] = useState({
        title: false,
        dateStart: false,
        dateEnd: false,
        address: false,
        price: false,
        details: false,
        summary: false,
    });
    const [createFormError, setCreateFormError] = useState(false);

    const [editorTitleState, setEditorTitleState] = useState(() => EditorState.createEmpty());
    const [editorSummaryState, setEditorSummaryState] = useState(() => EditorState.createEmpty());
    const [editorAddressState, setEditorAddressState] = useState(() => EditorState.createEmpty());
    const [editorDetailsState, setEditorDetailsState] = useState(() => EditorState.createEmpty());
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [price, setPrice] = useState<number | null>(0);
    const [openPrice, setOpenPrice] = useState(false);
    const [tag, setTag] = useState("Others");

    const [imageFile, setImageFile] = useState<null | File>(null);

    useEffect(() => {
        if (eventToEdit) {
            setEditorTitleState(EditorState.createWithContent(ContentState.createFromText(eventToEdit.title)));
            setEditorSummaryState(EditorState.createWithContent(ContentState.createFromText(eventToEdit.summary)));
            setEditorAddressState(EditorState.createWithContent(ContentState.createFromText(eventToEdit.address)));
            setEditorDetailsState(EditorState.createWithContent(ContentState.createFromText(eventToEdit.details)));
            setPrice(Number(eventToEdit.price));
            setOpenPrice(eventToEdit.openPrice)
            setStartDate(eventToEdit.dateStart);
            setEndDate(eventToEdit.dateEnd);
            setTag(eventToEdit.tag);
        }
    }, [eventToEdit]);

    useEffect(() => {

    });

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const event = {
            title: editorTitleState.getCurrentContent().getPlainText("\u000A"),
            dateStart: startDate,
            dateEnd: endDate,
            address: editorAddressState.getCurrentContent().getPlainText("\u000A"),
            openPrice,
            details: editorDetailsState.getCurrentContent().getPlainText("\u000A"),
            summary: editorSummaryState.getCurrentContent().getPlainText("\u000A"),
            tag: tag,
            price: price || 0,
        }

        if (!checkForm(event)) return;

        try {
            let eventDetails;
            setIsLoading(true);

            if (eventToEdit) {
                eventDetails = await editEvent(eventToEdit?._id, event);
            } else {
                eventDetails = await createEvent(event);
            }


            const coverPhoto = imageFile ? imageFile : await fetchDefaultImage();

            if (coverPhoto) {
                await uploadToFirebase(coverPhoto, eventDetails._id);
            }

            setNewEvent(eventDetails);
            setRedirect(true);
            setIsLoading(false);
        } catch {
            setCreateEventError(true);
            setIsLoading(false);
        }
    }

    function checkForm(event: TNewEvent) {
        let status = true;

        for (const [key, val] of Object.entries(event)) {
            if (["openPrice", "tag"].includes(key)) continue;

            if (val instanceof Date) {
                if (key === "dateEnd") {
                    if (val.valueOf() <= event.dateStart.valueOf()) {
                        setFormError(formError => ({ ...formError, dateEnd: true }));
                        status = false;
                    } else {
                        setFormError(formError => ({ ...formError, dateEnd: false }));
                    }
                }
            }

            if (typeof val === "string") {
                if (!val) {
                    setFormError(formError => ({ ...formError, [key]: true }));
                    status = false;
                } else {
                    setFormError(formError => ({ ...formError, [key]: false }));
                }
            }

            if (key === "price" && typeof val === "number") {
                const allowed = (val > 0 && val < 0.3);
                setFormError(formError => ({ ...formError, price: allowed }));
            }
        }

        setCreateFormError(!status);
        return status;
    }

    return (
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
                                        formError={formError}
                                        setOpenPrice={setOpenPrice}
                                        openPrice={openPrice}
                                    />
                                }
                            </>

                        )
                        : (
                            <div className="header-short" onClick={() => setExpandHeader(true)}>
                                <h2>
                                    Event Header
                                    {
                                        (formError.title || formError.summary || formError.price) && (
                                            <LiaExclamationCircleSolid className="error-icon" color="red" />
                                        )
                                    }
                                </h2>
                                <p>Attendees will see these details at the top of your event page.</p>
                            </div>
                        )
                }
            </section>

            <section className="form-item datelocation-container" onClick={() => setExpandDateLocation(true)}>
                <div className="datelocation-short">
                    <h2>Date and Location
                        {
                            (formError.dateStart || formError.dateEnd || formError.address) && (
                                <LiaExclamationCircleSolid className="error-icon" color="red" />
                            )
                        }
                    </h2>
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
                                    setEditorAddressState={setEditorAddressState}
                                    formError={formError} />
                            }
                        </>
                    )
                }
            </section>

            <section className="form-item about-container" onClick={() => setExpandAbout(true)}>
                <h2>About this event
                    {
                        formError.details && (
                            <LiaExclamationCircleSolid className="error-icon" color="red" />
                        )
                    }
                </h2>
                <p className="padding-bottom">Use this section to tell members of the community more details about this event.</p>
                {

                    expandAbout && (
                        <>
                            {
                                <AboutForm
                                    editorDetailsState={editorDetailsState}
                                    setEditorDetailsState={setEditorDetailsState}
                                    setTag={setTag}
                                    formError={formError} />
                            }
                        </>
                    )
                }
            </section>
            {
                createFormError && (
                    <div className="create-form-error">
                        Something is not right. Please check your form.
                    </div>
                )
            }
            <button form="create-form">{eventToEdit ? "Save Changes" : "Save and Create"}</button>
        </form>
    )
}