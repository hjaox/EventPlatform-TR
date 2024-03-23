import seed from "./seed";
import data from "../seed/data/development-data/users";
import { TUser } from "common/models/types";
import mongoose from "mongoose";
import db from "../connection";

async function runSeed(usersData: TUser[]) {
    await db();
    await seed(usersData);
    await mongoose.connection.close();
    console.log("Development data seeded successfully.");
}

runSeed(data);