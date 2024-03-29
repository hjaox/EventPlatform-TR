import express from "express";
import { createPaymentIntent } from "../models/stripe.model";

export async function getPaymentIntent(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        const price = Number(req.params.price);
        const paymentIntent = await createPaymentIntent(price);

        return res.status(200).send({clientSecret: paymentIntent});
    } catch (err) {
        next(err)
    }
}