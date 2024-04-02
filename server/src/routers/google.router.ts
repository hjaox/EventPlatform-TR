import express from "express";
import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config({
  path: `${__dirname}/../..//env/${process.env.NODE_ENV || "development"}`
})


const calendar = google.calendar({
  version: "v3",
  auth: process.env.apiKey
})

const googleRouter = express.Router();

/*
get code from url consent,
then send to getOauthtoken to login the user,
then schedule-event to insert event to calendar
*/

export default googleRouter
    .get("/oauth2cb", getConsent)
    .get("/getOauthToken/:code", getOauth2Token)
    .get("/schedule-event", scheduleEvent);

  const oauth2Client = new google.auth.OAuth2(
    process.env.clientId,
    process.env.clientSecret,
    "http://localhost:5173/Completion"
  );

  const scopes = [
    'https://www.googleapis.com/auth/calendar.events',
    "https://www.googleapis.com/auth/calendar.events"
  ];

function getConsent(req: express.Request, res: express.Response, next: express.NextFunction) {
  console.log(process.env.clientId)
      const url = oauth2Client.generateAuthUrl({
        // 'online' (default) or 'offline' (gets refresh_token)
        access_type: 'offline',

        // If you only need one scope you can pass it as a string
        scope: scopes,
        include_granted_scopes: true,
        response_type: "code"
      });

      return res.status(200).send(url)
}

async function getOauth2Token(req: express.Request, res: express.Response, next: express.NextFunction) {
  try {
    console.log("code is ", req.params.code)
    const {tokens} = await oauth2Client.getToken(req.params.code)
    console.log("token is ",tokens)
    oauth2Client.setCredentials(tokens)


    console.log(res)
  } catch(err) {
    console.log(err)
  }
}


async function scheduleEvent() {
  const event = {
    'summary': 'Awesome Event!',
    'location': '800 Howard St., San Francisco, CA 94103',
    'description': 'Really great refreshments',
    'start': {
      'date': '2024-04-03',
    },
    'end': {
      'date': '2024-04-04',
    },
    'attendees': [
      {'email': 'lpage@example.com'},
      {'email': 'sbrin@example.com'}
    ],
  }

  await calendar.events.insert({
    calendarId: 'primary',
    auth: oauth2Client,
    requestBody: event
  })

}