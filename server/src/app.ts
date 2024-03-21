import express from "express";
import cors from "cors";
import apiRouter from "./routers/api.router";

const app = express();

app.use(express.json());
app.use(cors({ exposedHeaders: ["Authorization"] }));

app.use("/", apiRouter);

app.use((err: express.ErrorRequestHandler) => {
    console.log("Internal Server Error");
})

export default app;