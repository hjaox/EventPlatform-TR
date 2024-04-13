import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./fbAuth";

export async function uploadToFirebase(file: File, userId: string) {
    try {
        const imageRef = ref(storage, `images/${userId}`);

        const snapshot = await uploadBytes(imageRef, file)
        const url = await getDownloadURL(snapshot.ref);

        return url;
    } catch (err) {
        return null;
    }
}

export async function downloadImage(eventId: string) {
    try {
        const path = `images/${eventId}.jpg`;
        const imageRef = ref(storage, path);
        const url = await getDownloadURL(imageRef);

        if(url) return url;
        return null;
    } catch(err) {
        return null;
    }
}