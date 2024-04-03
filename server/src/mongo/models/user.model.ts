import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        _id: {
            type: String,
            required: true,
            default: new mongoose.Types.ObjectId()
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
        _id: false,
        timestamps: true
    },
);

const UserModel = model("User", userSchema);

export default UserModel;
