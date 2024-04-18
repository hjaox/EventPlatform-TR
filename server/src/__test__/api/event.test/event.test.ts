import app from "../../../app";
import request from "supertest";
import EventModel from "../../../mongo/models/event.model";
import seed from "../../../mongo/seed/seed";
import { usersData, eventsData, tagsData } from "../../../mongo/seed/data/test-data";
import db from "../../../mongo/connection";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config({
    path: `${__dirname}/../../../../.env${process.env.NODE_ENV}`
});

beforeAll(async () => {
    await db();
    await seed(usersData, eventsData, tagsData);
});
afterAll(async () => await mongoose.connection.close());

describe("/event endpoints tests", () => {
    describe.only("GET /event/:eventId", () => {
        test("200: returns status code 200 upon successful request", async () => {
            const testEventId = await EventModel.findOne({}, "_id");

            await request(app)
                .get(`/event/${testEventId?._id}`)
                .expect(200);
        });
        test("200: returns the eventDetails of the requested eventId", async () => {
            const testEventId = await EventModel.findOne({}, "_id");

            const { body: { eventDetails } } = await request(app)
                .get(`/event/${testEventId?._id}`)

            const expected = await EventModel.findById({ _id: testEventId?._id });

            expect(JSON.stringify(eventDetails)).toBe(JSON.stringify(expected));
        })
        test("404: returns status code 404 and message 'Not Found' if eventId does not exist", async () => {
            const testEventId = "6603478dfbe4196732000000";

            const { body: { message } } = await request(app)
                .get(`/event/${testEventId}`)
                .expect(404);

            expect(message).toBe("Not Found");
        })
        test("400: returns status code 400 and message 'Please provide a valid event id' if send with an invalid eventId", async () => {
            const testEventId = "notAValidObjectId";

            const { body: { message } } = await request(app)
                .get(`/event/${testEventId}`)
                .expect(400);

            expect(message).toBe("Please provide a valid event id.");
        });
    });

    describe("POST /event endpoint tests", () => {
        const testEvent = {
            title: "testEvent",
            dateStart: new Date("2024-03-26T10:17:25.449Z"),
            dateEnd: new Date("2024-03-26T10:17:25.449Z"),
            address: "address",
            openPrice: false,
            price: 0,
            details: "",
            summary: "",
            attendees: [],
            images: ["https://images.pexels.com/photos/19080203/pexels-photo-19080203/free-photo-of-the-fernsehturm-tower-at-night-with-trees-in-the-background.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"],
            tag: ["tag"],
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

            for (const [key, val] of Object.entries(testEvent)) {
                if (val instanceof Date) {
                    expect(newEvent).toHaveProperty(key, val.toISOString())
                } else {
                    expect(newEvent).toHaveProperty(key, val);
                }
            }

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

    describe("PATCH /event/:eventId tests", () => {
        test("200: returns status code 200 upon successful request", async () => {
            const testEventId = await EventModel.findOne({}, "_id");
            const testPatchBody = { title: "testPatch" };

            await request(app)
                .patch(`/event/${testEventId?._id}`)
                .send(testPatchBody)
                .set({ "Authorization": `Bearer ${process.env.ACCESSTOKEN}` })
                .expect(200);
        });
        test("200: returns updated event details upon successful request", async () => {
            const testEventId = await EventModel.findOne({}, "_id");
            const testPatchBody = { title: "testPatch" };

            const { body: { updatedEventDetails } } = await request(app)
                .patch(`/event/${testEventId?._id}`)
                .send(testPatchBody)
                .set({ "Authorization": `Bearer ${process.env.ACCESSTOKEN}` });

            const expected = await EventModel.findById({ _id: testEventId?._id });

            expect(JSON.stringify(updatedEventDetails)).toBe(JSON.stringify(expected));
        });
        test("404: status code 404 and message 'Not Found' if eventId does not exist", async () => {
            const testEventId = "6603478dfbe4196732000000";
            const testPatchBody = { title: "testPatch" };

            const { body: { message } } = await request(app)
                .patch(`/event/${testEventId}`)
                .send(testPatchBody)
                .set({ "Authorization": `Bearer ${process.env.ACCESSTOKEN}` })
                .expect(404);

            expect(message).toBe("Not Found");
        });
        test("400: status code 400 and message 'Bad Request' if eventId is not a valid ObjectId", async () => {
            const testEventId = "notAValidObjectId";
            const testPatchBody = { title: "testPatch" };

            const { body: { message } } = await request(app)
                .patch(`/event/${testEventId}`)
                .send(testPatchBody)
                .set({ "Authorization": `Bearer ${process.env.ACCESSTOKEN}` })
                .expect(400);

            expect(message).toBe("Bad Request");
        });

        describe("DELETE /event/:eventId", () => {
            test("204: returns status code 204 upon successful request", async () => {
                const testEventId = await EventModel.findOne({}, "_id");

                await request(app)
                    .delete(`/event/${testEventId?._id}`)
                    .set({ "Authorization": `Bearer ${process.env.ACCESSTOKEN}` })
                    .expect(204)
            });
            test("204: returns no content upon successful request", async () => {
                const testEventId = await EventModel.findOne({}, "_id");

                const { body } = await request(app)
                    .delete(`/event/${testEventId?._id}`)
                    .set({ "Authorization": `Bearer ${process.env.ACCESSTOKEN}` })

                expect(Object.entries(body).length).toBeFalsy();
            });
            test("404: returns status code 404 and message 'Not Found' if eventId does not exist", async () => {
                const testEventId = "6603478dfbe4196732000000";

                const { body: { message } } = await request(app)
                    .delete(`/event/${testEventId}`)
                    .set({ "Authorization": `Bearer ${process.env.ACCESSTOKEN}` })
                    .expect(404);

                expect(message).toBe("Not Found");
            });
            test("400: returns status code 400 and message 'Bad Request' if eventId is not a valid ObjectId", async () => {
                const testEventId = "notAValidObjectId";

                const { body: { message } } = await request(app)
                    .delete(`/event/${testEventId}`)
                    .set({ "Authorization": `Bearer ${process.env.ACCESSTOKEN}` })
                    .expect(400);

                expect(message).toBe("Bad Request");
            });
        });
    });
});

