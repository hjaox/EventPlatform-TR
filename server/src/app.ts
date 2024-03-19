import express from "express";
import cors from "cors";
import apiRouter from "./routers/api.router";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", apiRouter);

app.use((err: express.ErrorRequestHandler) => {
    console.log("error", err)
})

export default app;