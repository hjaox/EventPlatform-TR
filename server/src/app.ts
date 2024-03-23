import express from "express";
import cors from "cors";
import apiRouter from "./routers/api.router";

const app = express();

app.use(express.json());
app.use(cors({ exposedHeaders: ["Authorization"] }));

app.use("/", apiRouter);

app.use((err: express.ErrorRequestHandler | { status: number, msg: string },
    _: express.Request,
    res: express.Response,
    next: express.NextFunction) => { //custom error handler
    if (typeof err === "object" && err.msg) {
        return res.status(400).send({ msg: err.msg });
    }
    next(err);
})

app.use((err: express.ErrorRequestHandler,
    _: express.Request,
    res: express.Response,
    next: express.NextFunction) => {
    console.log("Internal Server Error");
    return res.status(500).send({ msg: "Internal Server Error" });
})

export default app;