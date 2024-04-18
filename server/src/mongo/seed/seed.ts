import { TTestUser, TEvent } from "../../common/types";
import mongoose from "mongoose";
import UserModel from "../../mongo/models/user.model";
import EventsModel from "../../mongo/models/event.model";
import TagModel from "../../mongo/models/tag.model";

export default async function seed(usersData: TTestUser[], eventsData: TEvent[], tagsData: { tags: string[] }) {
    try {
        await mongoose.connection.dropDatabase();
        await UserModel.create(usersData);
        await EventsModel.create(eventsData);
        await TagModel.create(tagsData);
    } catch (err) {
        console.log("Seeding failed: ", err);
        return Promise.reject();
    }
}