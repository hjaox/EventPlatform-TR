import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./fbAuth";

export async function uploadToFirebase(file: File, userId: string) {
    try {
        const imageRef = ref(storage, `images/${userId}`);

        const snapshot = await uploadBytes(imageRef, file)
        const url = await getDownloadURL(snapshot.ref);

        return url;
    } catch (err) {
        console.log(err)
        return null;
    }
}