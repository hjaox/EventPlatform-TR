import { fetchAllTags } from "../models/tags.model";
import express from "express";

export async function getAllTags(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        const tags = await fetchAllTags();

        return res.status(200).send({tags});
    } catch(err) {
        next(err)
    }

}