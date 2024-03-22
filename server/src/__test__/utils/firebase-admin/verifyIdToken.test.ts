import { deleteAllUsers, getAllUsers, verifyIdToken } from "../../../utils/firebase-admin/fbAdminFunctions";
import { signUp } from "../../../utils/firebase/fbFunctions";
import auth from "../../../utils/firebase/fbAuth";

beforeEach(async () => {
    const allUsers = await getAllUsers();

    if (allUsers?.length) {
        await deleteAllUsers(allUsers.map(user => user.uid));
    }
})

describe("firebase-admin verifyIdToken tests", () => {
    test("returns decoded token upon successful request", async () => {
        const testUser = {
            email: "test@gmail.com",
            password: "testPass"
        };
        const userCredentials = await signUp(auth, testUser.email, testUser.password);
        const userToken = await userCredentials.user.getIdToken();
        const testVal = await verifyIdToken(userToken);

        if (!testVal) throw new Error("Unexpedted null testVal value")

        const properties = [
            "iss",
            "aud",
            "auth_time",
            "user_id",
            "sub",
            "iat",
            "exp",
            "email",
            "email_verified",
            "firebase",
            "uid",
        ]

        properties.forEach(item => {
            expect(testVal).toHaveProperty(item);
        })
    });
    test("returns null upon failed request", async () => {
        const testVal = await verifyIdToken("invalidToken");

        expect(testVal).toBeNull();
    });
})