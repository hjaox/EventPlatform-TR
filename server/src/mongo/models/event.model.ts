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
            default: ["https://firebasestorage.googleapis.com/v0/b/eventplatform-tr.appspot.com/o/images%2Fdefault.jpg?alt=media&token=2106f36d-e843-4fea-b8b9-a5ab06ec3787"],
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
            default: false
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