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
        location: {
            type: Map,
            of: new Schema(
                {
                    address: {
                        type: String,
                        required: true,
                    },
                    coordinates: {
                        type: [Number],
                        required: true,
                    }
                }
            )
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
        timestamps: true
    }
);

const EventsModel = model("Events", eventSchema);
export default EventsModel;