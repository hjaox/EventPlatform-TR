import app from "../../../app";
import request from "supertest";
import UserModel from "../../../mongo/models/user.model";
import seed from "../../../mongo/seed/seed";
import testData from "../../../mongo/seed/data/test-data/users";
import db from "../../../mongo/connection";
import mongoose from "mongoose";
import { verifyIdToken } from "../../../utils/firebase-admin/fbAdminFunctions";
import { TUser } from "../../../common/models/types";

beforeAll(async () => await db());
beforeEach(async () => await seed(testData));
afterAll(() => mongoose.connection.close());

describe("POST /login endpoint tests", () => {
    const testUser1 = {
        email: "testUser1@gmail.com",
        password: "testPass1"
    };
    const testUser2 = {
        email: "emailDoesNotExist@gmail.com",
        password: "anyPassword"
    };

    test("200: returns status code 200 upon successful request", async () => {
        await request(app)
            .post("/login")
            .send(testUser1)
            .expect(200);
    })
    test("200: returns user details upon successful request", async () => {
        const { body: { userDetails } } = await request(app)
            .post("/login")
            .send(testUser1);

        const result = await UserModel.find({ email: testUser1.email });

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
    test("200: returns response with authorization header containing valid access token", async() => {
        const testResponse = await request(app)
            .post("/login")
            .send(testUser1);

        const testVal = await verifyIdToken(testResponse.header.authorization.split(" ")[1]);

        if (!testVal) throw new Error("Unexpected null value of testval");

        expect(Object.entries(testVal).length).toBeTruthy();
    });
    test("400: returns status code 400 upon failed request", async () => {
        await request(app)
        .post("/login")
        .send(testUser2);
    });
    test("400: returns status code 400 when sent with incorrect email or password", async () => {
        const {body: {msg}} = await request(app)
        .post("/login")
        .send(testUser2)
        .expect(400);

        expect(msg).toBe("Incorrect email or password");
    });
});