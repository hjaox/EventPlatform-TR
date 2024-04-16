import { useState } from "react";
import { TEvent } from "../../../common/types"
import "../../../styles/EventPage/basket.scss";
import { LuPlus } from "react-icons/lu";
import { LuMinus } from "react-icons/lu";
import Payment from "./Payment";
import { IoReturnUpBack } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { actions } from "../../../utils/redux/reducers";
import { addAttendee } from "../../../utils/axios/event";

type TBasket = {
    eventDetails: TEvent,
    setShowPurchase: React.Dispatch<React.SetStateAction<boolean>>,
    setShowBasket: React.Dispatch<React.SetStateAction<boolean>>
};

export default function Basket({ eventDetails, setShowPurchase, setShowBasket }: TBasket) {
    const dispatch = useDispatch();
    const [showPayment, setShowPayment] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [openPriceError, setOpenPriceError] = useState(false);
    const [buyerDetails, setBuyerDetails] = useState({
        name: "",
        email: "",
        eventId: eventDetails._id,
        price: eventDetails.price,
        quantity: 1
    })

    function addTicket() {
        setBuyerDetails(buyerDetails => ({ ...buyerDetails, quantity: buyerDetails.quantity + 1 }));
    }

    function subtractTicket() {
        if (buyerDetails.quantity) {
            setBuyerDetails(buyerDetails => ({ ...buyerDetails, quantity: buyerDetails.quantity - 1 }));
        }
    }

    function handleBuyerName(e: React.ChangeEvent<HTMLInputElement>) {
        setBuyerDetails(buyerDetails => ({ ...buyerDetails, name: e.target.value }));
    }

    function handleBuyerEmail(e: React.ChangeEvent<HTMLInputElement>) {
        setBuyerDetails(buyerDetails => ({ ...buyerDetails, email: e.target.value }));
    }

    async function handlePayment() {
        if (!buyerDetails.name || !buyerDetails.email || checkOpenPrice()) {
            setNameError(() => !buyerDetails.name ? true : false);
            setEmailError(() => !buyerDetails.email ? true : false);
            setOpenPriceError(() => checkOpenPrice());

            return;
        }

        dispatch(actions.storeBuyerDetails({ ...buyerDetails }));
        setNameError(false);
        setEmailError(false);
        setOpenPriceError(false);

        if (buyerDetails.price) {
            setShowPayment(true);
        } else {
            setShowBasket(false);
            setShowPurchase(true);
            await addAttendee(eventDetails._id, buyerDetails.name, buyerDetails.email, buyerDetails.quantity)
        }
    }

    function checkOpenPrice() {
        return (buyerDetails.price > 0 && buyerDetails.price < 0.3) || buyerDetails.price < eventDetails.price;
    }

    function handleOpenPrice(e: React.ChangeEvent<HTMLInputElement>) {
        setBuyerDetails(buyerDetails => ({ ...buyerDetails, price: Number(e.target.value) }));
    }

    return (
        <section className="basket">
            {
                showPayment
                    ? (
                        <div className="basket-payment">
                            <Payment />

                            <button className="back" onClick={() => setShowPayment(false)}>
                                <IoReturnUpBack className="back-icon" />
                                <span className="back-text">Go back</span>
                            </button>
                        </div>

                    )
                    : (
                        <div className="basket-ticket">
                            <h1 className="title">{eventDetails.title}</h1>
                            <form className="buyer-form">
                                <p>Kindly fill up the following details.</p>
                                <div className="buyer-details">
                                    <label htmlFor="buyer-name">Name: </label>
                                    {
                                        nameError && (
                                            <div className="error">Please enter your name.</div>
                                        )
                                    }
                                    <input id="buyer-name" type="text" onChange={handleBuyerName} value={buyerDetails.name} />
                                    <label htmlFor="">Email: </label>
                                    {
                                        emailError && (
                                            <div className="error">Please enter your email.</div>
                                        )
                                    }
                                    <input id="buyer-email" type="text" onChange={handleBuyerEmail} value={buyerDetails.email} />
                                </div>
                            </form>
                            {
                                eventDetails.openPrice && (
                                    <div className="open-price">
                                        <p className="set-price">You are free to pay however much you feel the event is worth! (Min. ₤ {eventDetails.price})</p>

                                        <div className="input-container">
                                            ₤<input type="number" onChange={handleOpenPrice} value={buyerDetails.price} min={eventDetails.price} />
                                            {
                                                openPriceError && (
                                                    <p className="error">Minimum set price is ₤0.30 or higher than the price of the event.</p>
                                                )
                                            }
                                        </div>

                                    </div>

                                )
                            }
                            <div className="ticket-form">
                                <div className="price">
                                    <div className="label">Price</div>
                                    <div>£ {buyerDetails.price}</div>
                                </div>
                                <div className="quantity-select">
                                    <div className="label">Qty</div>
                                    <div className="form">
                                        <div className={`subtract-container ${buyerDetails.quantity ? "enabled" : "disabled"}`} onClick={() => subtractTicket()}>
                                            <LuMinus className="subtract" />
                                        </div>
                                        <span className="quantity">{buyerDetails.quantity}</span>
                                        <div className="add-container enabled" onClick={() => addTicket()}>
                                            <LuPlus className="add" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="price-total-container">
                                <div className="label">Total</div>
                                <div className="price-total">£ {buyerDetails.price * buyerDetails.quantity}</div>
                            </div>
                            <button onClick={() => handlePayment()} className="checkout">Checkout</button>
                        </div>
                    )
            }
        </section>
    )
}