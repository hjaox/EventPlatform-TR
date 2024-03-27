import { getCredFromCustomToken } from "../utils/firebase/fbFunctions";
import { getCustomToken } from "../utils/firebase-admin/fbAdminFunctions";
import express from "express";
import auth from "../utils/firebase/fbAuth";

export async function createIdToken(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        const customToken = await getCustomToken(req.body.uid);
        if(customToken) {
            const idToken = await getCredFromCustomToken(auth, customToken);
            const token = await idToken?.user.getIdToken();
            return res.status(201).send({token});
        }
        return Promise.reject({status: 400, msg: "Bad Request"})
    } catch(err) {
        next(err)
    }

}