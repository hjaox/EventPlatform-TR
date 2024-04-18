import express from "express";
import { verifyIdToken } from "../utils/firebase-admin/fbAdminFunctions";

export async function authHandler(req: express.Request, res: express.Response, next: express.NextFunction) {
    const auth = req.headers.authorization;

    if (!(typeof auth === "string")) return res.status(401).send({ message: "Unauthorized access" });

    const token = auth && auth.split(" ")[1];

    const result = await verifyIdToken(token);

    if (!result) return res.status(401).send({ message: "Unauthorized access" });

    next();
}