import UserModel from "../mongo/models/user.model";
import auth from "../utils/firebase/fbApp";
import { signUp } from "../utils/firebase/fbFunctions";


export async function postUser(name: string, email: string, password: string) {
    try {
        const userCredentials = await signUp(auth, email, password);
        const userToken = await userCredentials.user.getIdToken();
        const uid = userCredentials.user.uid

        const newUser = await UserModel.create({ name, email, password, _id: uid });

        return newUser;
    } catch (err) {
        console.log("model", err)
        return Promise.reject(err)
    }
}