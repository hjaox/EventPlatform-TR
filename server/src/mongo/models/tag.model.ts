import { Schema, model } from "mongoose";

const tagSchema = new Schema(
    {
        tags: [{ type: String }]
    },
    {
        timestamps: false,
    }
);



const TagModel = model("Tag", tagSchema);
export default TagModel;