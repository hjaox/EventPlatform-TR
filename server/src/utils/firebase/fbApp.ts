import { initializeApp } from "firebase/app";
import fbConfig from "./fbConfig";
import { getAuth } from "firebase/auth";

const app = initializeApp(fbConfig);
const auth = getAuth(app);
export default auth;

// console.log(auth)
// test(auth, "testEmail@gmail.com", "testPword")