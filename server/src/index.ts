import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.listen(9090, () => {
    console.log("listening")
})