import UserModel from "../mongo/models/user.model";
import auth from "../utils/firebase/fbAuth";
import { signUp } from "../utils/firebase/fbFunctions";


export async function postUser(name: string, email: string, password: string) {
    try {
        const userCredentials = await signUp(auth, email, password);
        const userToken = await userCredentials.user.getIdToken();
        const uid = userCredentials.user.uid

        const newUser = await UserModel.create({ name, email, password, _id: uid });

        return { newUser, userToken };
    } catch (err) {
        if(err === "Sign Up failed") return Promise.reject({status: 400, msg: err})
        console.log("Model postUser error", err)
        return Promise.reject(err)
    }
}