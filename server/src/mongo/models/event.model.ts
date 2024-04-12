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
            required: true,
        },
        images: {
            type: [String],
            required: true,
        },
        summary: {
            type: String,
            default: "",
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
        isFree: {
            type: Boolean,
            default: true
        },
        tag: {
            type: [String],
            default: ["Others"]
        },
    },
    {
        timestamps: true,
    }
);



const EventModel = model("Event", eventSchema);
export default EventModel;