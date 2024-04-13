import { useState } from "react";
import { TEvent } from "../../../common/types"
import "../../../styles/EventPage/basket.scss";
import { LuPlus } from "react-icons/lu";
import { LuMinus } from "react-icons/lu";
import Payment from "./Payment";
import { IoReturnUpBack } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { actions } from "../../../utils/redux/reducers";

type TBasket = {
    eventDetails: TEvent,
    setPurchaseDetails: React.Dispatch<React.SetStateAction<{
        quantity: number;
        price: number;
    } | null>>,
    setShowBasket:  React.Dispatch<React.SetStateAction<boolean>>
};

export default function Basket({ eventDetails, setPurchaseDetails, setShowBasket }: TBasket ) {
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);
    const [showPayment, setShowPayment] = useState(false);
    const [buyerName, setBuyerName] = useState("");
    const [buyerEmail, setBuyerEmail] = useState("");
    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);

    function addTicket() {
        setQuantity(quantity => quantity + 1);
    }

    function subtractTicket() {
        if (quantity) {
            setQuantity(quantity => quantity - 1);
        }
    }

    function handlePayment() {
        if (!buyerName) setNameError(true);
        if (!buyerEmail) setEmailError(true);

        if (buyerName && buyerEmail) {
            dispatch(actions.storeBuyerDetails({ name: buyerName, email: buyerEmail }));

            if (eventDetails.price) {
                setShowPayment(true);
            } else {
                setPurchaseDetails(() => ({ quantity, price: 0 }));
                setShowBasket(false);
            }
        }
    }

    return (
        <section className="basket">
            {
                showPayment
                    ? (
                        <div className="basket-payment">
                            <Payment
                                quantity={quantity}
                                eventDetails={eventDetails} />

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
                                    <input id="buyer-name" type="text" onChange={e => setBuyerName(e.target.value)} />
                                    <label htmlFor="">Email: </label>
                                    {
                                        emailError && (
                                            <div className="error">Please enter your email.</div>
                                        )
                                    }
                                    <input id="buyer-email" type="text" onChange={e => setBuyerEmail(e.target.value)} />
                                </div>
                            </form>
                            <div className="ticket-form">
                                <div className="price">
                                    <div className="label">Price</div>
                                    <div>£ {eventDetails.price}</div>
                                </div>
                                <div className="quantity-select">
                                    <div className="label">Qty</div>
                                    <div className="form">
                                        <div className={`subtract-container ${quantity ? "enabled" : "disabled"}`} onClick={() => subtractTicket()}>
                                            <LuMinus className="subtract" />
                                        </div>
                                        <span className="quantity">{quantity}</span>
                                        <div className="add-container enabled" onClick={() => addTicket()}>
                                            <LuPlus className="add" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="price-total-container">
                                <div className="label">Total</div>
                                <div className="price-total">£ {eventDetails.price * quantity}</div>
                            </div>
                            <button onClick={() => handlePayment()} className="checkout">Checkout</button>
                        </div>
                    )
            }
        </section>
    )
}