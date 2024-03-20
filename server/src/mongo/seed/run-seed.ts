import seed from "./seed";
import data from "../seed/data/development-data/users";
import { User } from "common/models/types";
import mongoose from "mongoose";
import "../connection";

async function runSeed(usersData: User[]) {
    await seed(usersData);
    await mongoose.connection.close();
    console.log("Development data seeded successfully.");
}

runSeed(data);