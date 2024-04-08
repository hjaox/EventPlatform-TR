import express from "express";
import cors from "cors";
import apiRouter from "./routers/api.router";
import {verifyIdToken} from "./utils/firebase-admin/fbAdminFunctions";

const app = express();

app.use(express.json());
app.use(cors({ exposedHeaders: ["Authorization"] }));

// app.use(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
//     const auth = req.headers.authorization;

//     if(!(typeof auth === "string")) return res.status(400).send({msg: "Bad request"});

//     const token = auth && auth.split(" ")[1];

//     const result = await verifyIdToken(token);

//     if(!result) return res.status(400).send({msg: "Bad request"});

//     next();
// })

app.use("/", apiRouter);

app.use((err: express.ErrorRequestHandler | { status: number, message: string },
    _: express.Request,
    res: express.Response,
    next: express.NextFunction) => { //custom error handler
    if (typeof err === "object" && err.message && err.status) {
        return res.status(err.status).send({ message: err.message });
    }
    next(err);
})

app.use((err: express.ErrorRequestHandler,
    _: express.Request,
    res: express.Response,
    next: express.NextFunction) => {
    console.log("Internal Server Error");
    return res.status(500).send({ message: "Internal Server Error" });
})

export default app;