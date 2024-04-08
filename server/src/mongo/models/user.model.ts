import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
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
