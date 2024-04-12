import express from "express";
import cors from "cors";
import apiRouter from "./routers/api.router";
import { authHandler, customErrorHandler, internalServerError } from "./middleware/errorhandlers";

const app = express();

app.use(express.json());
app.use(cors({ exposedHeaders: ["Authorization"] }));
app.use(authHandler);

app.use("/", apiRouter);

app.use(customErrorHandler);
app.use(internalServerError);

export default app;