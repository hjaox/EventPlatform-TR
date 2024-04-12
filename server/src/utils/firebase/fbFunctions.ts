import { Auth, createUserWithEmailAndPassword, signInWithCustomToken, signInWithEmailAndPassword } from "firebase/auth";

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
        console.log(err)
        return Promise.reject("Sign in failed")
    }
}

export async function getCredFromCustomToken(auth: Auth, customToken: string) {
    try{
        return await signInWithCustomToken(auth, customToken);
    } catch(err) {
        console.log(err)
        return null
    }
}