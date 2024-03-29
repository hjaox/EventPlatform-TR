import { TTestUser, TEvent } from "../../common/types";
import mongoose from "mongoose";
import { deleteAllUsers, getAllUsers } from "../../utils/firebase-admin/fbAdminFunctions";
import { signUp } from "../../utils/firebase/fbFunctions";
import auth from "../../utils/firebase/fbAuth";
import UserModel from "../../mongo/models/user.model";
import EventsModel from "../../mongo/models/event.model";
import TagModel from "../../mongo/models/tag.model";

export default async function seed(usersData: TTestUser[], eventsData: TEvent[], tagsData: { tags: string[] }) {
    try {
        await mongoose.connection.dropDatabase();
        const usersFirebase = await getAllUsers();

        if (usersFirebase && usersFirebase.length) await deleteAllUsers(usersFirebase.map(user => user.uid));

        await Promise.all(usersData.map(user => signUp(auth, user.email, user.password)));
        await UserModel.create(usersData);
        await EventsModel.create(eventsData);
        await TagModel.create(tagsData);
    } catch (err) {
        console.log(err);
        console.log("Seeding failed");
        return Promise.reject();
    }
}