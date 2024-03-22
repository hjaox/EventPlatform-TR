import { createUser, deleteAllUsers, getAllUsers } from "../../../utils/firebase-admin/fbAdminFunctions";

beforeEach(async () => {
    const allUsers = await getAllUsers();

    if (allUsers?.length) {
        await deleteAllUsers(allUsers.map(user => user.uid));
    }
})

describe("firebase-admin createUser function tests", () => {
    test("returns an object upom successful request", async () => {
        const testUser =
        {
            email: "test1@gmail.com",
            password: "testpass1"
        };

        const testVal = await createUser(testUser.email, testUser.password);

        expect(typeof testVal).toBe("object");
        expect(Array.isArray(testVal)).toBeFalsy();
    });
    test("returns user email and uid upon successful request", async () => {
        const testUser =
        {
            email: "test1@gmail.com",
            password: "testpass1"
        };

        const testVal = await createUser(testUser.email, testUser.password);

        expect(testVal).toHaveProperty("email");
        expect(testVal).toHaveProperty("uid");
    });
    test("returns null if email already exist and the request is unsuccessful", async () => {
        const testUser =
        {
            email: "test1@gmail.com",
            password: "testpass1"
        };

        await createUser(testUser.email, testUser.password);
        const testValue = await createUser(testUser.email, testUser.password);

        expect(testValue).toBeNull();
    });
});