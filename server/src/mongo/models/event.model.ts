import { Schema, model } from "mongoose";

const locationSchema = new Schema(
    {
        address: String,
        coordinates: [Number, Number],
    },
    {
        _id: false,
    }
);

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
        location: locationSchema,
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



const EventsModel = model("Event", eventSchema);
export default EventsModel;