import { initializeApp } from "firebase/app";
import fbConfig from "./fbConfig";
import { getAuth } from "firebase/auth";

const app = initializeApp(fbConfig);

export default getAuth(app);