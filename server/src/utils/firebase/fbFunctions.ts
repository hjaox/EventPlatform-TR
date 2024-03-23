import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export async function signUp(auth: Auth, email: string, password: string) {
    try {
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);

        return userCredentials;
    } catch (err) {
        return Promise.reject("Email already exist")
    }

}

export async function singIn(auth: Auth, email: string, password: string) {
    try {
        const userCredentials = await signInWithEmailAndPassword(auth, email, password);

        return userCredentials;
    } catch (err) {
        return Promise.reject("Sign in failed")
    }
}