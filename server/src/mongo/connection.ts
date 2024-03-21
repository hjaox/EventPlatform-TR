import mongoose from "mongoose";
import * as dotenv from "dotenv";

const ENV = process.env.NODE_ENV || "development";

dotenv.config({
    path: `${__dirname}/../../.env.${ENV}`
});

const db = async () => {
    if (process.env.MONGODBURL) {
        try {
            await mongoose.connect(process.env.MONGODBURL);
            console.log("Connected to MongoDB")
        } catch (err) {
            console.log("Failed to connect to MongoDB")
        }
    } else {
        console.log("Provide URL for database connection in env file")
    }
};

export default db;