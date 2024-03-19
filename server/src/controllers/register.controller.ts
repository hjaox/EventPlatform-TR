import express from "express";

export const registerUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log("test")
    next();
    return res.status(200).send("test")

}