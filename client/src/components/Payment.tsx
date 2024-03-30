import { useEffect, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { getPaymentIntent } from "../utils/axios/stripe";

function Payment() {
  const [stripePromise, setStripePromise] = useState<any|null>(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
//     fetch("/config").then(async (r) => {
//       const { publishableKey } = await r.json();
//       setStripePromise(loadStripe(publishableKey));
//     });
setStripePromise(loadStripe(import.meta.env.VITE_PUBLISHABLE_KEY))
  }, []);



  useEffect(() => {
//     fetch("/create-payment-intent", {
//       method: "POST",
//       body: JSON.stringify({}),
//     }).then(async (result) => {
//       var { clientSecret } = await result.json();
//       setClientSecret(clientSecret);
//     });
getPaymentIntent()
.then(({client_secret}) => {
    console.log(client_secret)
    setClientSecret(client_secret)
})
  }, []);

  return (
    <>
      <h1>React Stripe and the Payment Element</h1>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
}

export default Payment;
