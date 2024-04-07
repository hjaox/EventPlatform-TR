import { useState } from "react";
import { TEvent } from "../../../common/types"
import "../../../styles/EventPage/basket.scss";
import { LuPlus } from "react-icons/lu";
import { LuMinus } from "react-icons/lu";
import Payment from "./Payment";
import { IoReturnUpBack } from "react-icons/io5";


export default function Basket({ eventDetails }: { eventDetails: TEvent }) {
    const [quantity, setQuantity] = useState(1);
    const [showPayment, setShowPayment] = useState(false);

    function addTicket() {
        setQuantity(quantity => quantity + 1);
    }

    function subtractTicket() {
        if (quantity) {
            setQuantity(quantity => quantity - 1);
        }
    }

    function handlePayment() {
        setShowPayment(true);
    }

    return (
        <section className="basket">
            {
                showPayment
                    ? (
                        <div className="basket-payment">
                            <Payment
                            quantity={quantity}
                            eventDetails={eventDetails}/>

                            <button className="back" onClick={() => setShowPayment(false)}>
                                <IoReturnUpBack className="back-icon" />
                                <span className="back-text">Go back</span>
                                </button>
                        </div>

                    )
                    : (
                        <div className="basket-ticket">
                            <h1 className="title">{eventDetails.title}</h1>

                            <div className="ticket-form">
                                <div className="price">£ {eventDetails.price}</div>

                                <div className="quantity-select">

                                    <div className="label">Qty</div>
                                    <div className={`subtract-container ${quantity ? "enabled" : "disabled"}`} onClick={() => subtractTicket()}>
                                        <LuMinus className="subtract"  />
                                    </div>

                                    <span className="quantity">{quantity}</span>


                                    <div className="add-container enabled" onClick={() => addTicket()}>
                                        <LuPlus className="add"  />
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