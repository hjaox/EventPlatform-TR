import { handleMongoDBError } from "../utils/utils";
import UserModel from "../mongo/models/user.model";
import auth from "../utils/firebase/fbAuth";
import { signUp, singIn } from "../utils/firebase/fbFunctions";
import { TMongoError } from "../common/types";

export async function postUser(name: string, email: string, password: string) {
    try {
        if (await checEmailIfExists(email)) return Promise.reject({ status: 400, msg: "Email already exist" })

        const userCredentials = await signUp(auth, email, password);
        const userToken = await userCredentials.user.getIdToken();

        const newUser = await UserModel.create({ name, email });

        return { ...newUser.toObject(), accessToken: userToken };
    } catch (err) {
        if (err === "Sign Up failed") return Promise.reject({ status: 400, msg: err })
        console.log("Model postUser error", err);
        return Promise.reject(err)
    }
}

async function checEmailIfExists(email: string) {
    try {
        const check = await UserModel.find({ email });

        return !!check.length
    } catch (err) {
        return false;
    }
}

export async function getUserWithCredentials(email: string, password: string) {
    try {
        const [userDetails] = await UserModel.find({ email }, {}, { lean: true });
        const userCredentials = await singIn(auth, email, password);
        const userToken = await userCredentials.user.getIdToken();

        return { ...userDetails, accessToken: userToken };
    } catch (err) {
        return Promise.reject({ status: 400, msg: "Incorrect email or password" })
    }
}

export async function createUser(name: string, email: string) {
    try {
        const newUser = await UserModel.create({ name, email });

        return newUser;
    } catch (err) {

        return Promise.reject(handleMongoDBError(err as TMongoError));
    }
}

export async function findUser(email: string) {
    try {
        const userDetails = await UserModel.find({ email });

        return userDetails;
    } catch (err) {
        return Promise.reject(handleMongoDBError(err as TMongoError));
    }
}