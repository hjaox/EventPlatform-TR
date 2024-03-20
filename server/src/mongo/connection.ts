import mongoose from "mongoose";
import * as dotenv from "dotenv";

const ENV = process.env.NODE_ENV || "development";

dotenv.config({
    path: `${__dirname}/../../.env.${ENV}`
});

export default (async () => {
    if (process.env.MONGODBURL) {
        try {
            await mongoose.connect(process.env.MONGODBURL)
        } catch (err) {
            console.log(err)
        }
    } else {
        console.log("Provide URL for database connection in env file")
    }
})();