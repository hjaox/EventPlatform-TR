import { sanitizeFilter } from "mongoose";
import UserModel from "../mongo/models/user.model";
import { singIn } from "../utils/firebase/fbFunctions";
import auth from "../utils/firebase/fbAuth";

export async function getUserWithCredentials(email: string, password: string) {
    const sanitizedQuery = sanitizeFilter({ email });

    try {
        const [userDetails] = await UserModel.find(sanitizedQuery);
        const userCredentials = await singIn(auth, email, password);
        const userToken = await userCredentials.user.getIdToken();

        return { userDetails, userToken };
    } catch (err) {
        return Promise.reject({ status: 400, msg: "Incorrect email or password" })
    }
}

