import app from "../../../app";
import request from "supertest";
import EventModel from "../../../mongo/models/event.model";
import seed from "../../../mongo/seed/seed";
import { usersData, eventsData } from "../../../mongo/seed/data/test-data";
import db from "../../../mongo/connection";
import mongoose from "mongoose";
import { TEvent } from "../../../common/types";
import * as dotenv from "dotenv";
dotenv.config({
    path: `${__dirname}/../../../../.env${process.env.NODE_ENV}`
});

beforeAll(async () => {
    await db();
    await seed(usersData, eventsData);
});
afterAll(async () => await mongoose.connection.close());

describe("GET /events endpoint tests", () => {
    test("200: returns status code 200 upon successsful request", async () => {
        await request(app)
        .get("/events")
        .set({"Authorization": `Bearer ${process.env.ACCESSTOKEN}`})
        .expect(200);
    });
    test("200: returns all events available in the database", async () => {
        const {body : {allEvents}} = await request(app)
        .get("/events")
        .set({"Authorization": `Bearer ${process.env.ACCESSTOKEN}`});

        const expected = await EventModel.find();

        expect(JSON.stringify(allEvents)).toBe(JSON.stringify(expected));
    });
});