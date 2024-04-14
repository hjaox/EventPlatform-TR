import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getEvent } from "../../utils/axios/event";
import { TEvent, TReduxUser } from "../../common/types";
import Header from "../subcomponents/Header/Header";
import Footer from "../subcomponents/Footer/Footer";
import "../../styles/EventPage/event.scss";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { MagnifyingGlass } from "react-loader-spinner";
import Basket from "./components/Basket";
import { IoMdClose } from "react-icons/io";
import { GoogleLoginButton } from "react-social-login-buttons";
import { useSelector } from "react-redux";
import { getOauthConsent } from "../../utils/axios/google";
import { downloadImage } from "../../utils/firebase/functions";
import defaultImage from "../../assets/default.jpg";

export default function Event() {
    const { eventId } = useParams();
    const buyerDetails = useSelector((state: TReduxUser) => state.buyerDetails);
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [eventDetails, setEventDetails] = useState<null | TEvent>(null);
    const [showBasket, setShowBasket] = useState(false);
    const [showPurchase, setShowPurchase] = useState(false);
    const [coverPhoto, setCoverPhoto] = useState<string>(defaultImage);

    useEffect(() => {
        if (eventId) {
            (async () => {
                const result = await getEvent(eventId);
                const url = await downloadImage(result._id);

                if (url) {
                    setCoverPhoto(url);
                }
                setEventDetails(() => ({ ...result }));
            })();
        } else {
            navigate("/Error")
        }

        const quantity = Number(searchParams.get("quantity"));
        const price = Number(searchParams.get("price"));

        if (quantity && price) {
            setShowPurchase(true);
            setSearchParams({});
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

        return `${day}, ${month} ${date} • ${startTime} - ${endTime}`;
    }

    async function handleAddToCalendar() {
        const url = await getOauthConsent();

        window.open(url, "_blank", "popup,width=100");
    }

    return (
        <section className="event-page">
            <Header />
            {
                !eventDetails
                    ? (
                        <div className="loading-page">
                            <MagnifyingGlass color="purple" />
                            <div>Loading event</div>
                        </div>
                    )
                    : (
                        <section className="event-display">
                            <div className="image-container">
                                <img className="image" src={coverPhoto} alt="pic-center" />
                            </div>
                            <div className="info">
                                <div className="event-header">
                                    <h1 className="title">{eventDetails.title}</h1>
                                    <div className="ticket">
                                        <span className="price">{eventDetails.price ? `£${eventDetails.price}` : "Free event"}</span>
                                        <button onClick={() => setShowBasket(showBasket => !showBasket)}>{eventDetails.price ? "Buy ticket" : "Secure ticket"}</button>
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
                                    <div>eventDetails.address</div>
                                </div>
                                <div className="details">
                                    <h2>About</h2>
                                    <p>{eventDetails.details}</p>
                                </div>
                                <div className="tag">#{eventDetails.tag}</div>
                            </div>
                        </section>
                    )
            }

            {
                eventDetails && (
                    <div className={`payment-page ${showBasket ? "show" : "hide"}-payment`}>
                        <div className="payment-container">
                            <IoMdClose className="close-payment" onClick={() => setShowBasket(() => false)} />
                            <Basket eventDetails={eventDetails} setShowPurchase={setShowPurchase} setShowBasket={setShowBasket} />
                        </div>
                    </div>
                )
            }

            {
                eventDetails && showPurchase && (
                    <div className={`purchaseDetails-container ${showPurchase ? "show" : "hide"}-purchase`}>
                        <div className="purchase-details">
                            <h1 className="title">{eventDetails.title}</h1>
                            <p className="purchase-message">🎉 You have secured your ticket/s. Thank you for your order 🎉</p>
                            <div className="ticket">
                                <div className="quantity">
                                    <h2 className="label">Qty</h2>
                                    1 x {buyerDetails.quantity}
                                </div>
                                <div className="totalPrice">
                                    <h2 className="label"> Total</h2>
                                    £ {buyerDetails.price * buyerDetails.quantity}
                                </div>
                            </div>
                            <div className="addToCalendar">
                                <p>You can add this event to your google calendar.</p>
                                <GoogleLoginButton className="google-login" onClick={() => handleAddToCalendar()} size="2.5rem" style={{ width: "fit-content" }} />
                            </div>
                            <IoMdClose className="close-purchase" onClick={() => setShowPurchase(false)} />
                            <div className="navigation">
                                <button className="back" onClick={() => setShowPurchase(false)}>Go back</button>
                                <button className="home" onClick={() => navigate("/Home")}>Go Home</button>
                            </div>
                        </div>
                    </div>
                )
            }
            <Footer />
        </section >
    )
}