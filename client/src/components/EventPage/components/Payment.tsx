import { useEffect, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { getPaymentIntent } from "../../../utils/axios/stripe";
import "../../../styles/EventPage/payment.scss";
import { TEvent } from "../../../common/types";

function Payment({ quantity, eventDetails }: {quantity : number, eventDetails: TEvent}) {
  const [stripePromise, setStripePromise] = useState<any | null>(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    setStripePromise(loadStripe(import.meta.env.VITE_PUBLISHABLE_KEY))
    getPaymentIntent(quantity * eventDetails.price)
      .then(({ client_secret }) => {
        setClientSecret(client_secret)
      })
  }, []);

  return (
    <div className="payment">
      <div className="payment-header">
      <h1>Check out</h1>
      <h1>Total Price: £{quantity * eventDetails.price}</h1>
      </div>

      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm eventDetails={eventDetails} quantity={quantity}/>
        </Elements>
      )}
    </div>
  );
}

export default Payment;
