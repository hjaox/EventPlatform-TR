import express from "express";
import { postUser } from "../models/register.model";

export const registerUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { name, email, password } = req.body;

    try{
        const newUser = await postUser(name, email, password);
        return res.status(201).send({newUser})
    } catch(err) {
        console.log("controller", err)
        console.log(err)
    }
}