import seed from "./seed";
import {usersData, eventsData} from "../seed/data/development-data/";
import { TEvent, TTestUser } from "../../common/types";
import mongoose from "mongoose";
import db from "../connection";

async function runSeed(usersData: TTestUser[], eventsData: TEvent[]) {
    await db();
    await seed(usersData, eventsData);
    await mongoose.connection.close();
    console.log("Development data seeded successfully.");
}

runSeed(usersData, eventsData);