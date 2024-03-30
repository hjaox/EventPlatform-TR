import instance from "./instance";

export async function getPaymentIntent(price: number = 0) {
    const {data: {clientSecret}} = await instance
    .get("/create-payment-intent/100");

    return clientSecret;
}