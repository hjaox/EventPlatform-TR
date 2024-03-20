import * as dotenv from "dotenv";

const ENV = process.env.NODE_ENV || "development";

dotenv.config({
    path: `${__dirname}/../../../.env.${ENV}`
});

export default {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
    measurementId: process.env.measurementId
  };