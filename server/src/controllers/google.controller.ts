import dotenv from "dotenv";
import { google } from "googleapis";
import express from "express";

dotenv.config({
    path: `${__dirname}/../..//env/${process.env.NODE_ENV || "development"}`
})

const oauth2Client = new google.auth.OAuth2(
    process.env.clientId,
    process.env.clientSecret,
    "http://localhost:5173/Popup"
);

export function getConsent(_: express.Request, res: express.Response, next: express.NextFunction) {
    const scopes = [
        'https://www.googleapis.com/auth/calendar.events',
        "https://www.googleapis.com/auth/calendar.events"
    ];

    const url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
        response_type: "code",
        prompt: "consent"
    });

    return res.status(200).send({ url })
}


export async function scheduleEvent(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { code, eventSchedule } = req.body

    const calendar = google.calendar({
        version: "v3",
        auth: process.env.apiKey
    })

    try {
        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens)

        const result = await calendar.events.insert({
            calendarId: 'primary',
            auth: oauth2Client,
            requestBody: eventSchedule
        })

        if (result.status === 200) return res.status(201).send({ message: "Successfully added event to calendar" });

        return res.status(400).send({ message: "Something went wrong" });
    } catch (err) {
        return res.status(400).send({ message: "Something went wrong" });
    }



}