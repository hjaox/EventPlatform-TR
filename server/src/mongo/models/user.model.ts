import { Schema, model } from "mongoose";

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            unique: true,
        }
    }
);

const UserModel = model("User", userSchema);

export default UserModel;
