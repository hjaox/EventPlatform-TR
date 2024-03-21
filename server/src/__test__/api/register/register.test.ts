import app from "../../../app";
import request from "supertest";
import UserModel from "../../../mongo/models/user.model";
import seed from "../../../mongo/seed/seed";
import testData from "../../../mongo/seed/data/test-data/users";
import db from "../../../mongo/connection";
import mongoose from "mongoose";

beforeAll(async () => await db());
beforeEach(async () => await seed(testData));
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
            .expect(201)
    });
});