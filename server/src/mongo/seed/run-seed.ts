import seed from "./seed";
import { usersData, eventsData, tagsData } from "../seed/data/development-data/";
import { TEvent, TTestUser } from "../../common/types";
import mongoose from "mongoose";
import db from "../connection";

async function runSeed(usersData: TTestUser[], eventsData: TEvent[], tagsData: { tags: string[] }) {
    try {
        await db();
        await seed(usersData, eventsData, tagsData);
        await mongoose.connection.close();
        console.log("Development data seeded successfully.");
    } catch (err) {
        console.log("Seeding development data failed.");
    }

}

runSeed(usersData, eventsData, tagsData);