import mongoose, { Schema, model } from "mongoose";

const eventSchema = new Schema(
    {
        title: {
            type: String,
        },
        dateStart: {
            type: Date,
        },
        dateEnd: {
            type: Date,
        },
        address: {
            type: String,
        },
        images: {
            type: [String],
            default: []
        },
        coordinates: {
            type: [Number, Number],
            default: []
        },
        summary: {
            type: String,
            default: ""
        },
        details: {
            type: String,
            default: "",
        },
        attendees: {
            type: [mongoose.Schema.Types.ObjectId],
            default: []
        },
        price: {
            type: Number,
            default: 0
        },
        openPrice: {
            type: Boolean,
            default: false
        },
        tag: {
            type: [String],
            default: ["Others"]
        },
        organizer: {
            type: String,
        }
    },
    {
        timestamps: true,
    }
);



const EventModel = model("Event", eventSchema);
export default EventModel;