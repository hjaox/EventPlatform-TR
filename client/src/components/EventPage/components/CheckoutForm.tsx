import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import "../../../styles/EventPage/checkoutForm.scss";
import { TReduxUser } from "../../../common/types";
import { MagnifyingGlass } from "react-loader-spinner";
import { useSelector } from "react-redux";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const buyerDetails = useSelector((state: TReduxUser) => state.buyerDetails);

  const [errorMsg, setErrorMsg] = useState<string|null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return <MagnifyingGlass />;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/Event/${buyerDetails.eventId}?quantity=${buyerDetails.quantity}&price=${buyerDetails.price}`,
        },
      });

      if (error.type === "card_error" || error.type === "validation_error") {
        if(typeof error.message === "string") setErrorMsg(error.message);
      } else {
        setErrorMsg("An unexpected error occured.");
      }

      setIsProcessing(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <button disabled={isProcessing || !stripe || !elements} id="submit">
        <span id="button-text">
          {isProcessing ? "Processing ... " : "Pay now"}
        </span>
      </button>

      {errorMsg && <div id="payment-errorMsg">{errorMsg}</div>}
    </form>
  );
}
