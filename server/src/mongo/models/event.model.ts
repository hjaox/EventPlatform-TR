import mongoose, { Schema, model } from "mongoose";

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
        images: {
            type: [String]
        },
        coordinates: {
            type: [Number, Number]
        },
        summary: {
            type: String,
            required: false,
            default: ""
        },
        details: {
            type: String,
            required: false,
            default: "",
        },
        attendees: {
            type: [mongoose.Schema.Types.ObjectId],
            required: false,
            default: []
        },
        price: {
            type: Number,
            required: false,
            default: 0
        },
        openPrice: {
            type: Boolean,
            required: false,
            default: false
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