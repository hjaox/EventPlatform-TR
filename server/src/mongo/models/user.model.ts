import { Schema, model } from "mongoose";

const userSchema = new Schema(
    {
        name: {
            type: String,
        },
        email: {
            type: String,
            unique: true,
        },
        eventsAttending: {
            type: []
        },
        eventsOrganized: {
            type: []
        },
    },
    {
        timestamps: true
    },
);

const UserModel = model("User", userSchema);

export default UserModel;
