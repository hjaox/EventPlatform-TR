import { initializeApp } from "firebase/app";
import fbConfig from "./fbConfig";
import { getAuth } from "firebase/auth";
import { test } from "./fbFunctions";

const app = initializeApp(fbConfig);
const auth = getAuth(app);
// export default getAuth(app);

// console.log(auth)
test(auth, "testEmail@gmail.com", "testPword")