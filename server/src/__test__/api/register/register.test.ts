import app from "../../../app";
import request from "supertest";
import UserModel from "../../../mongo/models/user.model";
import seed from "../../../mongo/seed/seed";
import testData from "../../../mongo/seed/data/test-data/users";
import db from "../../../mongo/connection";
import mongoose from "mongoose";
import { getAllUsers, deleteAllUsers, createUser, verifyIdToken } from "../../../utils/firebase-admin/fbAdminFunctions";
import { TUser } from "../../../common/models/types";

beforeAll(async () => await db());
beforeEach(async () => {
    const allUsers = await getAllUsers();

    if (allUsers?.length) {
        await deleteAllUsers(allUsers.map(user => user.uid));
    }

    await seed(testData);
    await Promise.all(testData.map(user => createUser(user.email, user.password)));
});
afterAll(() => mongoose.connection.close());

describe("POST /register tests", () => {
    const testUser = {
        name: "testPost User",
        email: "testPostEmail@gmail.com",
        password: "testPostPass"
    };

    test("201: returns 201 upon succesful request", async () => {
        await request(app)
            .post("/register")
            .send(testUser)
            .expect(201);
    });
    test("201: returns new user details upon successful request", async () => {
        const { body: { newUser } } = await request(app)
            .post("/register")
            .send(testUser);

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
        const testResponse = await request(app)
            .post("/register")
            .send(testUser);

        const testVal = await verifyIdToken(testResponse.header.authorization.split(" ")[1]);

        if (!testVal) throw new Error("Unexpected null value of testval");

        expect(Object.entries(testVal).length).toBeTruthy();
    });
    test("400: returns status code 400 when email already exist", async () => {
        await request(app)
            .post("/register")
            .send(testUser);

        await request(app)
            .post("/register")
            .send(testUser)
            .expect(400);
    });
    test("400: returns message 'Email already exist' when email already exist", async () => {
        await request(app)
            .post("/register")
            .send(testUser);

        const { body: { msg } } = await request(app)
            .post("/register")
            .send(testUser)

        expect(msg).toBe("Email already exist");
    });
});