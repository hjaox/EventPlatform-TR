import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import auth, { storage } from "./fbAuth";
import { deleteAllUsers, getAllUsers } from "../../utils/firebase-admin/fbAdminFunctions";
import { TTestUser } from "common/types";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { readFile } from "fs/promises";

export async function signUp(auth: Auth, email: string, password: string) {
    try {
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);

        return userCredentials;
    } catch (err) {
        return Promise.reject(err);
    }
};

export async function singIn(auth: Auth, email: string, password: string) {
    try {
        const userCredentials = await signInWithEmailAndPassword(auth, email, password);

        return userCredentials;
    } catch (err) {
        return Promise.reject(err);
    }
};

export async function seedFirebaseUsers(usersData: TTestUser[]) {
    const usersFirebase = await getAllUsers();

    if (usersFirebase && usersFirebase.length) await deleteAllUsers(usersFirebase.map(user => user.uid));

    await Promise.all(usersData.map(user => signUp(auth, user.email, user.password)));
};

export async function uploadToFirebase(path: string, eventId: string) {
    const fileBuffer = await readFile(path);
    const fileBlob = new Blob([fileBuffer], { type: "image/jpeg" });

    try {
        const imageRef = ref(storage, `images/${eventId}`);

        const snapshot = await uploadBytes(imageRef, fileBlob);
        const url = await getDownloadURL(snapshot.ref);

        return url;
    } catch (err) {
        return null;
    }
};