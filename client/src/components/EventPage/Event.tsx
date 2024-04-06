import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEvent } from "../../utils/axios/event";
import { TEvent } from "../../common/types";
import Header from "../subcomponents/Header/Header";
import Footer from "../subcomponents/Footer/Footer";
import "../../styles/EventPage/event.scss";
import Payment from "../Payment";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { MagnifyingGlass } from "react-loader-spinner";

export default function Event() {
    const { eventId } = useParams();
    const [eventDetails, setEventDetails] = useState<null | TEvent>(null);
    const [showPayment, setShowPayment] = useState(false);

    useEffect(() => {
        if (eventId) {
            (async () => {
                const result = await getEvent(eventId);
                setEventDetails(() => ({ ...result }));
            })();
        }

    }, []);

    function handleDateAndTime(dateStart: Date, dateEnd: Date) {
        const dayList = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "August", "October", "November", "December"];
        const start = new Date(dateStart);
        const end = new Date(dateEnd);
        const month = months[start.getMonth()];
        const day = dayList[start.getDay()];
        const date = start.getDate();
        const startTime = start.toLocaleTimeString("en-US");
        const endTime = end.toLocaleTimeString("en-US");

        return <>
            {`${day}, ${month} ${date} • ${startTime} - ${endTime}`}
        </>
    }

    function handleLocation(address: string, coords: number[]) {
        return <>{address}</>
    }
    if (eventDetails) {
        console.log(new Date(eventDetails.dateStart).toDateString().toString())
        console.log(eventDetails.dateStart)
        const test = (new Date(eventDetails.dateStart))
        console.log(test.getDay())
        test.setTime(test.getTime() + 100000000)
        console.log(test.toLocaleTimeString("en-US"))
    }

    function handleBuyTicket(price: number) {
        setShowPayment(showPayment => !showPayment)
    }

    return (
        <section className="event-page">
            <Header />

            {
                !eventDetails
                    ? (
                        <div className="loading-page">
                            <MagnifyingGlass color="purple" />
                            <div>Loading your event</div>
                        </div>
                    )
                    : (
                        <section className="event-display">

                            <div className="image-container">
                                <img className="image" src={eventDetails.images[0]} alt="pic-center" />
                            </div>

                            <div className="info">
                                <div className="event-header">
                                    <h1 className="title">{eventDetails.title}</h1>

                                    <div className="ticket">
                                        <span className="price">{`£${eventDetails.price}`}</span>
                                        <button onClick={() => handleBuyTicket(eventDetails.price)}>Buy ticket</button>
                                    </div>

                                </div>

                                <div className="summary">{eventDetails.summary}</div>

                                <div className="time">
                                    <h2 className="time-title">Date and Time</h2>
                                    <div className="time-content">
                                    <FaRegCalendarCheck /> {handleDateAndTime(eventDetails.dateStart, eventDetails.dateEnd)}
                                    </div>
                                </div>

                                <div className="location">
                                    <h2>Location</h2>
                                    <div>{handleLocation(eventDetails.address, eventDetails.coordinates)}</div>
                                </div>

                                <div className="details">
                                    <h2>About</h2>
                                    <p>{eventDetails.details}</p>
                                </div>

                                <div className="tag">{eventDetails.tag}</div>

                                <div className="organizer">
                                    <h2>Organized by</h2>
                                    <div>{eventDetails.organizer}</div>
                                </div>

                                {
                                    showPayment && (
                                        <div className="payment-page">
                                            <Payment />
                                        </div>

                                    )
                                }
                            </div>
                        </section>
                    )
            }
            <Footer />
        </section >
    )
}