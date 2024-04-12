import { TError } from "common/types";
import express from "express";
import { verifyIdToken } from "../utils/firebase-admin/fbAdminFunctions";

export function customErrorHandler(err: express.ErrorRequestHandler,
    _: express.Request,
    res: express.Response,
    next: express.NextFunction): any {
    const error = err as TError;

    switch (error.code) {
        case "auth/invalid-credential":
            return res.status(400).send({ message: "Incorrect email or password" });
        case "auth/email-already-in-use":
            return res.status(400).send({ message: "Email already exist" });
        default:
            next(err);
    }
}

export function internalServerError(err: express.ErrorRequestHandler,
    _: express.Request,
    res: express.Response,
    next: express.NextFunction) {

    return res.status(500).send({ message: "Internal Server Error" });
}

export async function authHandler(req: express.Request, res: express.Response, next: express.NextFunction) {
    const auth = req.headers.authorization;

    if(!(typeof auth === "string")) return res.status(400).send({msg: "Bad request"});

    const token = auth && auth.split(" ")[1];

    const result = await verifyIdToken(token);

    if(!result) return res.status(400).send({msg: "Bad request"});

    next();
}