import express from "express";
import cors from "cors";
import apiRouter from "./routers/api.router";
import "./mongo/connection";

const app = express();

app.use(express.json());
app.use(cors({ exposedHeaders: ["Authorization"] }));

app.use("/", apiRouter);

app.use((err: express.ErrorRequestHandler) => {
    console.log("error", err)
})

export default app;