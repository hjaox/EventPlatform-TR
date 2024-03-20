import { Auth, createUserWithEmailAndPassword } from "firebase/auth";

export async function test(auth: Auth, email: string, password: string) {
    try{
        const userCedentials = await createUserWithEmailAndPassword(auth, email, password);
        const userToken = await userCedentials.user.getIdToken();
        const uid = userCedentials.user.uid
    } catch (err) {
        console.log(err)
    }

}