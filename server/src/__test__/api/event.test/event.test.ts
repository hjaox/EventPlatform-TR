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

describe("POST /event endpoint tests", () => {
    const testEvent = {
        title: "testEvent",
        dateStart: new Date("2024-03-26T10:17:25.449Z"),
        dateEnd: new Date("2024-03-26T10:17:25.449Z"),
        address: "address",
        coordinates: [52.5703, 0.2408],
        description: "description",
        tag: ["tag"],
        organizer: "organizer",
        createdAt: new Date("2024-03-26T10:17:25.449Z"),
        updatedAt: new Date("2024-03-26T10:17:25.449Z"),
    };

    test("201: returns status code 201 upon successful request", async () => {
        await request(app)
            .post("/event")
            .set({ "Authorization": `Bearer ${process.env.ACCESSTOKEN}` })
            .send(testEvent)
            .expect(201);
    });
    test("201: returns the new event details upon successful request", async () => {
        const { body: { newEvent } } = await request(app)
            .post("/event")
            .set({ "Authorization": `Bearer ${process.env.ACCESSTOKEN}` })
            .send(testEvent);

        const testVal = {
            ...testEvent,
            dateStart: testEvent.dateStart.toISOString(),
            dateEnd: testEvent.dateEnd.toISOString(),
            createdAt: testEvent.createdAt.toISOString(),
            updatedAt: testEvent.updatedAt.toISOString(),
        };

        const expected = { ...newEvent };
        delete expected._id;
        delete expected.__v;

        expect(testVal).toEqual(expected);
    });
    test("400: returns status code 400 upon failed request", async () => {
        await request(app)
            .post("/event")
            .set({ "Authorization": `Bearer ${process.env.ACCESSTOKEN}` })
            .send({})
            .expect(400);
    });
    test("400: returns status code 400 when event is missing the required properties", async () => {
        const testEvent1 = { ...testEvent } as any;
        delete testEvent1.title;

        await request(app)
            .post("/event")
            .set({ "Authorization": `Bearer ${process.env.ACCESSTOKEN}` })
            .send(testEvent1)
            .expect(400);
    });
});