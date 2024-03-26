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

describe("POST /register endpoint tests", () => {
    test("201: returns status code 201 and new user details upon succesful request", async () => {
        const testUser = {
            name: "testPost User1",
            email: "testPostEmail1@gmail.com",
            password: "testPostPass1"
        };

        const { body: { newUser } } = await request(app)
            .post("/register")
            .send(testUser)
            .expect(201);

        const testVal: TUser = newUser;

        const result = await UserModel.find({ name: testUser.name, email: testUser.email });

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

        expect(testVal).toEqual(expected);
    });
    test("returns response with authorization header containing valid access token", async () => {
        const testUser = {
            name: "testPost User2",
            email: "testPostEmail2@gmail.com",
            password: "testPostPass2"
        };

        const testResponse = await request(app)
            .post("/register")
            .send(testUser);

        const testVal = await verifyIdToken(testResponse.header.authorization.split(" ")[1]);

        if (!testVal) throw new Error("Unexpected null value of testval");

        expect(Object.entries(testVal).length).toBeTruthy();
    });
    test("400: returns status code 400 when email already exist", async () => {
        const testUser = {
            name: "testPost User1",
            email: "testPostEmail1@gmail.com",
            password: "testPostPass1"
        };

        await request(app)
            .post("/register")
            .send(testUser)
            .expect(400);
    });
    test("400: returns message 'Email already exist' when email already exist", async () => {
        const testUser = {
            name: "testPost User1",
            email: "testPostEmail1@gmail.com",
            password: "testPostPass1"
        };

        await request(app)
            .post("/register")
            .send(testUser);

        const { body: { msg } } = await request(app)
            .post("/register")
            .send(testUser)

        expect(msg).toBe("Email already exist");
    });
});