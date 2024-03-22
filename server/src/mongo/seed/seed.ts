import { TUser } from "common/models/types";
import UserModel from "../models/user.model";
import mongoose from "mongoose";

export default async function seed(usersData: TUser[]) {
    await mongoose.connection.dropDatabase();
    await UserModel.create(usersData);
}