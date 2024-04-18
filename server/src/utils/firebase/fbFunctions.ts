import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import auth from "./fbAuth";
import { deleteAllUsers, getAllUsers } from "../../utils/firebase-admin/fbAdminFunctions";
import { TTestUser } from "common/types";

export async function signUp(auth: Auth, email: string, password: string) {
    try {
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);

        return userCredentials;
    } catch (err) {
        return Promise.reject(err)
    }

}

export async function singIn(auth: Auth, email: string, password: string) {
    try {
        const userCredentials = await signInWithEmailAndPassword(auth, email, password);

        return userCredentials;
    } catch (err) {
        return Promise.reject(err)
    }
}

export async function seedFirebaseUsers(usersData: TTestUser[]) {
    const usersFirebase = await getAllUsers();

    if (usersFirebase && usersFirebase.length) await deleteAllUsers(usersFirebase.map(user => user.uid));

    await Promise.all(usersData.map(user => signUp(auth, user.email, user.password)));
}