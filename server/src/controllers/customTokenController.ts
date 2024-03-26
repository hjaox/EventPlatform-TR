import { getCustomToken } from "../utils/firebase-admin/fbAdminFunctions";
import express from "express";

export async function createCustomToken(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        const customToken = await getCustomToken(req.body.uid);

        return res.status(201).send({customToken});
    } catch(err) {
        next(err)
    }

}