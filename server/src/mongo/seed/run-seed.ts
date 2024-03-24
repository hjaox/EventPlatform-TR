import seed from "./seed";
import data from "../seed/data/development-data/users";
import { TTestUser } from "../../common/models/types";
import mongoose from "mongoose";
import db from "../connection";

async function runSeed(usersData: TTestUser[]) {
    await db();
    await seed(usersData);
    await mongoose.connection.close();
    console.log("Development data seeded successfully.");
}

runSeed(data);