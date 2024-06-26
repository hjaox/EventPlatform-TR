import { TError } from "common/types";
import express from "express";

export function customErrorHandler(err: express.ErrorRequestHandler,
    _: express.Request,
    res: express.Response,
    next: express.NextFunction) {
    const error = err as TError;

    if (error.message && error.status) {
        return res.status(error.status).send({ message: error.message });
    }

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