import mongoose from "mongoose";
import nodemailer from "nodemailer";
import * as dotenv from "dotenv";

const ENV = process.env.NODE_ENV || "development";

dotenv.config({
    path: `${__dirname}/../../.env.${ENV}`
});

export function checkPatchEvent(event: unknown) {
    const eventProperties = ["title", "dateStart", "dateEnd", "address", "details", "summary", "tag", "price", "openPrice"];

    if (!event || typeof event !== "object" || Array.isArray(event)) return false;

    for (const property of eventProperties) {
        if (Object.keys(event).includes(property)) return true;
    }

    return false;
}

export function checkPostEvent(event: unknown) {
    const eventProperties = ["title", "dateStart", "dateEnd", "address"];

    if (!event || typeof event !== "object" || Array.isArray(event)) return false;

    for (const property of eventProperties) {
        if (!Object.keys(event).includes(property)) return false;
    }

    return true;
}

export function checkAttendee(attendee: unknown) {
    const attendeeProperty = ["name", "email", "quantity"];

    if (!attendee || typeof attendee !== "object" || Array.isArray(attendee)) return false;

    for (const property of attendeeProperty) {
        if (!Object.keys(attendee).includes(property)) return false;
    }

    return true;
}

export function checkIfValidObjectId(objectId: unknown) {
    return mongoose.isValidObjectId(objectId);
}

export async function sendTicketEmail(buyerEmail: string, eventTitle: string, quantity: number) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.email",
        auth: {
            user: process.env.nodemailerEmail,
            pass: process.env.nodemailerPassword,
        },
    });

    const subject = `${eventTitle} Event Tickets`;
    const html = `OUR COMMUNITY <br />
    Thank you for purchasing ${quantity} ${quantity > 1 ? "tickets" : "ticket"} for ${eventTitle} event.
    `;

    const info = await transporter.sendMail({
        from: `"Our Community" <${process.env.nodemailerEmail}>`,
        to: buyerEmail,
        subject,
        html
    });

    return info;
}