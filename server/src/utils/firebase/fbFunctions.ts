import { Auth, createUserWithEmailAndPassword } from "firebase/auth";

export async function signUp(auth: Auth, email: string, password: string) {
    try{
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
        return userCredentials;

    } catch (err) {
        console.log(err)
        return Promise.reject({status: 400, msg: "Sign Up failed"})
    }

}