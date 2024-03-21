import * as admin from "firebase-admin";
import fbAdminConfig from "./fbAdminConfig";
import { getAuth } from "firebase-admin/auth";

const serviceAccount = fbAdminConfig as admin.ServiceAccount;

const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

export default getAuth(app);
