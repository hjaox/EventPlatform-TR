import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { getPaymentIntent } from "../../../utils/axios/stripe";
import "../../../styles/EventPage/payment.scss";
import { TReduxUser } from "../../../common/types";
import { useSelector } from "react-redux";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi2";

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
        <h1 className="checkout">Checkout
          <HiOutlineQuestionMarkCircle />
          <span className="checkout-message">
            You can test the payment system using Stripe test cards. ( See <a href="https://docs.stripe.com/testing?locale=en-GB">documentation</a>).
          </span>
        </h1>
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
