import { Auth, createUserWithEmailAndPassword } from "firebase/auth";

export async function signUp(auth: Auth, email: string, password: string) {
    try{
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
        return userCredentials;

    } catch (err) {
        return Promise.reject("Sign Up failed")
    }

}