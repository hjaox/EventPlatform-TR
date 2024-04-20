import { initializeApp } from "firebase/app";
import fbConfig from "./fbConfig";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const app = initializeApp(fbConfig);

export const storage = getStorage(app);

export default getAuth(app);