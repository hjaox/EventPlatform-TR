import app from "../../../app";
import request from "supertest";
import UserModel from "../../../mongo/models/user.model";
import seed from "../../../mongo/seed/seed";
import { usersData, eventsData, tagsData } from "../../../mongo/seed/data/test-data";
import db from "../../../mongo/connection";
import mongoose from "mongoose";

beforeAll(async () => {
    await db();
    await seed(usersData, eventsData, tagsData);
});
beforeEach(() => jest.clearAllMocks());
afterAll(async () => await mongoose.connection.close());

describe("POST /user/login endpoint tests", () => {
    test("200: returns status code 200 upon successful request", async () => {
        const testUser = {
            email: "testUser1@gmail.com",
            password: "testPass1"
        };

        await request(app)
            .post("/user/login")
            .send(testUser)
            .expect(200);
    })
    test("200: returns user details upon successful request", async () => {
        const testUser = {
            email: "testUser2@gmail.com",
            password: "testPass2"
        };

        const { body: { userDetails } } = await request(app)
            .post("/user/login")
            .send(testUser);

        const [result] = await UserModel.find({ email: testUser.email });

        Object.entries(result.toObject()).forEach(([key, val]) => {
            if (val instanceof Date) {
                expect(userDetails).toHaveProperty(key, val.toISOString());

            } else if (val instanceof mongoose.Types.ObjectId) {
                expect(userDetails).toHaveProperty(key);
                expect(userDetails[key].toString()).toStrictEqual(val.toString());

            } else {
                expect(userDetails).toHaveProperty(key, val);
            }
        });
    });
    test("400: returns status code 400 upon failed request", async () => {
        const testUser = {
            email: "emailDoesNotExist@gmail.com",
            password: "anyPassword"
        };

        const { body: { message } } = await request(app)
            .post("/user/login")
            .send(testUser);

            expect(message).toBe("Incorrect email or password");
    });
    test("400: returns status code 400 when email or password is not provided", async () => {
        const testUser = {
            email: "emailDoesNotExist@gmail.com",
        };

        const { body: { message } } = await request(app)
            .post("/user/login")
            .send(testUser)
            .expect(400);

        expect(message).toBe("Please provide email, and password");
    });
});