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
afterAll(async () => await mongoose.connection.close());

describe("POST /user/register endpoint tests", () => {
    test("201: returns status code 201 and new user details upon succesful request", async () => {
        const testUser = {
            name: "testPost User1",
            email: "testPostEmail1@gmail.com",
            password: "testPostPass1"
        };

        const { body: { newUser } } = await request(app)
            .post("/user/register")
            .send(testUser)
            .expect(201);

        const [result] = await UserModel.find({ name: testUser.name, email: testUser.email });

        Object.entries(result.toObject()).forEach(([key, val]) => {
            if (val instanceof Date) {
                expect(newUser).toHaveProperty(key, val.toISOString());

            } else if (val instanceof mongoose.Types.ObjectId) {
                expect(newUser).toHaveProperty(key);
                expect(newUser[key].toString()).toStrictEqual(val.toString());

            } else {
                expect(newUser).toHaveProperty(key, val);
            }
        });
    });
    test("400: returns status code 400 when name or email or password is not provided", async () => {
        const testUser = {
            name: "testPost User1",
            email: "testPostEmail1@gmail.com",
        };

        const {body: {message}} = await request(app)
            .post("/user/register")
            .send(testUser)
            .expect(400);

        expect(message).toBe("Please provide name, email, and password");
    });
    test("400: returns status code 400 when email already exist", async () => {
        const testUser = {
            name: "testPost User1",
            email: "testPostEmail1@gmail.com",
            password: "testPostPass1"
        };

        const { body: { message } } = await request(app)
            .post("/user/register")
            .send(testUser)
            .expect(400);

        expect(message).toBe("Email already exist");
    });
});