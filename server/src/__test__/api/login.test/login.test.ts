import app from "../../../app";
import request from "supertest";
import UserModel from "../../../mongo/models/user.model";
import seed from "../../../mongo/seed/seed";
import { usersData, eventsData } from "../../../mongo/seed/data/test-data";
import db from "../../../mongo/connection";
import mongoose from "mongoose";
import { verifyIdToken } from "../../../utils/firebase-admin/fbAdminFunctions";
import { TUser } from "../../../common/types";

beforeAll(async () => {
    await db();
    await seed(usersData, eventsData);
});
afterAll(async () => await mongoose.connection.close());

describe("POST /login endpoint tests", () => {
    test("200: returns status code 200 upon successful request", async () => {
        const testUser = {
            email: "testUser1@gmail.com",
            password: "testPass1"
        };

        await request(app)
            .post("/login")
            .send(testUser)
            .expect(200);
    })
    test("200: returns user details upon successful request", async () => {
        const testUser = {
            email: "testUser2@gmail.com",
            password: "testPass2"
        };

        const { body: { userDetails } } = await request(app)
            .post("/login")
            .send(testUser);

        const result = await UserModel.find({ email: testUser.email });

        const expected: TUser = {
            name: result[0].name,
            _id: result[0]._id,
            email: result[0].email,
            eventsAttending: result[0].eventsAttending,
            eventsOrganized: result[0].eventsOrganized,
            createdAt: result[0].createdAt.toISOString(),
            updatedAt: result[0].updatedAt.toISOString(),
            __v: 0
        };

        expect(userDetails).toEqual(expected);
    });
    test("200: returns response with authorization header containing valid access token", async () => {
        const testUser = {
            email: "testUser3@gmail.com",
            password: "testPass3"
        };

        const testResponse = await request(app)
            .post("/login")
            .send(testUser);

        const testVal = await verifyIdToken(testResponse.header.authorization.split(" ")[1]);

        if (!testVal) throw new Error("Unexpected null value of testval");

        expect(Object.entries(testVal).length).toBeTruthy();
    });
    test("400: returns status code 400 upon failed request", async () => {
        const testUser = {
            email: "emailDoesNotExist@gmail.com",
            password: "anyPassword"
        };

        await request(app)
            .post("/login")
            .send(testUser);
    });
    test("400: returns status code 400 when sent with incorrect email or password", async () => {
        const testUser = {
            email: "emailDoesNotExist@gmail.com",
            password: "anyPassword"
        };

        const { body: { msg } } = await request(app)
            .post("/login")
            .send(testUser)
            .expect(400);

        expect(msg).toBe("Incorrect email or password");
    });
});