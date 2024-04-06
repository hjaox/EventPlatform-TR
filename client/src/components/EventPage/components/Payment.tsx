import { useEffect, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { getPaymentIntent } from "../../../utils/axios/stripe";
import "../../../styles/EventPage/payment.scss";

function Payment() {
  const [stripePromise, setStripePromise] = useState<any | null>(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    setStripePromise(loadStripe(import.meta.env.VITE_PUBLISHABLE_KEY))
    getPaymentIntent()
      .then(({ client_secret }) => {
        setClientSecret(client_secret)
      })
  }, []);

  return (
    <div className="payment">
      <h1>React Stripe and the Payment test</h1>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}

export default Payment;
