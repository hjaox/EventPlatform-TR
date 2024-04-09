import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./fbAuth";

export async function uploadToFirebase(blob: any) {
	const imageRef = ref(storage, `images/test`);

    const snapshot = await uploadBytes(imageRef, blob)
    console.log(snapshot)
    const url = await getDownloadURL(snapshot.ref);
    console.log(url)
}