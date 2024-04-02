import instance from "./instance";

export async function getPaymentIntent(price: number = 30) {
    const {data: {clientSecret}} = await instance
    .get(`/create-payment-intent/${price}`);

    return clientSecret;
}