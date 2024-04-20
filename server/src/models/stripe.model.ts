import Stripe from "stripe";
import * as dotenv from "dotenv";

dotenv.config({
    path: `${__dirname}/../../.env.${process.env.NODE_ENV || "development"}`
});

if (!process.env.SECRET_KEY) throw new Error("missing Stripe Secret Key");

const stripe = new Stripe(process.env.SECRET_KEY);

export async function createPaymentIntent(price: number) {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            currency: "GBP",
            amount: price,
            automatic_payment_methods: {
                enabled: true
            }
        });

        return paymentIntent;
    } catch (err) {
        return Promise.reject({ status: 400, message: "Error at creating payment intent" });
    }
}