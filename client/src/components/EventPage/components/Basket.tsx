import { useState } from "react";
import { TEvent } from "../../../common/types"
import "../../../styles/EventPage/basket.scss";
import { LuPlus } from "react-icons/lu";
import { LuMinus } from "react-icons/lu";


export default function Basket({ eventDetails }: { eventDetails: TEvent }) {
    const [quantity, setQuantity] = useState(1);

    function addTicket() {
        setQuantity(quantity => quantity + 1);
    }

    function subtractTicket() {
        if (quantity) {
            setQuantity(quantity => quantity - 1);
        }
    }

    return (
        <section className="basket">
            <h1 className="title">{eventDetails.title}</h1>

            <div className="ticket-form">
                <div className="price">£ {eventDetails.price}</div>

                <div className="quantity-select">

                    <div className="label">Qty</div>
                    <div className={`subtract-container ${quantity ? "enabled" : "disabled"}`}>
                        <LuMinus className="subtract" onClick={() => subtractTicket()} />
                    </div>

                    <span className="quantity">{quantity}</span>


                    <div className="add-container enabled">
                        <LuPlus className="add" onClick={() => addTicket()} />
                    </div>
                </div>
            </div>

            <div className="price-total-container">
                <div className="label">Total</div>

                <div className="price-total">£ {eventDetails.price * quantity}</div>
            </div>

            <button className="checkout">Checkout</button>
        </section>
    )
}