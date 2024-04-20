import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { getPaymentIntent } from "../../../utils/axios/stripe";
import "../../../styles/EventPage/payment.scss";
import { TReduxUser } from "../../../common/types";
import { useSelector } from "react-redux";

function Payment() {
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  const [stripePromise, setStripePromise] = useState<any | null>(null);
  const [clientSecret, setClientSecret] = useState("");
  const buyerDetails = useSelector((state: TReduxUser) => state.buyerDetails);

  useEffect(() => {
    setStripePromise(loadStripe(import.meta.env.VITE_PUBLISHABLE_KEY))
    getPaymentIntent(buyerDetails.quantity * buyerDetails.price)
      .then(({ client_secret }) => {
        setClientSecret(client_secret)
      })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="payment">
      <div className="payment-header">
        <h1>Check out</h1>
        <h1>Total Price: £{buyerDetails.quantity * buyerDetails.price}</h1>
      </div>

      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}

export default Payment;
