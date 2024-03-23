import { TTestUser } from "common/models/types";
import mongoose from "mongoose";
import { deleteAllUsers, getAllUsers } from "../../utils/firebase-admin/fbAdminFunctions";
import { signUp } from "../../utils/firebase/fbFunctions";
import auth from "../../utils/firebase/fbAuth";
import UserModel from "../../mongo/models/user.model";

export default async function seed(usersData: TTestUser[]) {
    try {
        await mongoose.connection.dropDatabase();
        const usersFirebase = await getAllUsers();

        if (usersFirebase && usersFirebase.length) await deleteAllUsers(usersFirebase.map(user => user.uid));

        await Promise.all(usersData.map(user => signUp(auth, user.email, user.password)));
        await UserModel.create(usersData);
    } catch (err) {
        console.log("Seeding failed")
    }
}