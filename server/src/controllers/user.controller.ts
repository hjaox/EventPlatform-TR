import express from "express";
import { getUserWithCredentials, postUser, createUser, findUser } from "../models/user.model";
import { onAuthStateChanged, signOut } from "firebase/auth";
import auth from "../utils/firebase/fbAuth";

export async function loginUser(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { email, password } = req.body;

    try {
        const userDetails = await getUserWithCredentials(email, password);

        return res.status(200)
            .send({ userDetails });
    } catch (err) {
        next(err);
    }
}

export const registerUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).send({ message: "Please provide name, email, and password" });
    }

    try {
        const newUser = await postUser(name, email, password);

        return res.status(201)
            .send({ newUser });
    } catch (err) {
        next(err)
    }
}

export async function signOutUser(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        await signOut(auth);
        await onAuthStateChanged(auth, user => {
            if (user) {
                return res.status(400).send({ message: "Sign out failed. Please try again." });
            }

            return res.status(200).send({ message: "Signed out successfully" });
        })

    } catch (err) {
        next({ status: 400, message: "Something went wrong" })
    }

}

export async function insertUser(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        const { name, email } = req.body;

        const newUser = await createUser(name, email);

        return res.status(201).send({ newUser });
    } catch (err) {

        next(err)
    }
}

export async function getUser(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        const { email } = req.params;

        const userDetails = await findUser(email);

        return res.status(200).send({ userDetails });
    } catch (err) {
        next(err)
    }
}