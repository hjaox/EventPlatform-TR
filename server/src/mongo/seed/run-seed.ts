import seed from "./seed";
import { usersData, eventsData, tagsData, imagesData } from "../seed/data/development-data/";
import { TEvent, TImagesData, TTestUser } from "../../common/types";
import mongoose from "mongoose";
import db from "../connection";
import { deleteAllImages, seedFirebaseUsers } from "../../utils/firebase/fbFunctions";

async function runSeed(usersData: TTestUser[], eventsData: TEvent[], tagsData: { tags: string[] }, imagesData: TImagesData) {
    try {
        await db();
        await seedFirebaseUsers(usersData);
        await deleteAllImages();
        await seed(usersData, eventsData, tagsData, imagesData);
        await mongoose.connection.close();
        console.log("Development data seeded successfully.");
    } catch (err) {
        console.log("Seeding development data failed.");
    }

}

runSeed(usersData, eventsData, tagsData, imagesData);