import { Schema, model } from "mongoose";

const eventSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        dateStart: {
            type: Date,
            required: true,
        },
        dateEnd: {
            type: Date,
            required: true,
        },
        address: {
            type: String,
            required: true
        },
        coordinates: {
            type: [Number, Number]
        },
        description: {
            type: String,
            required: false,
            default: "",
        },
        tag: {
            type: [String],
            required: false,
            default: ["Others"]
        },
        organizer: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);



const EventModel = model("Event", eventSchema);
export default EventModel;