import { createUser, deleteAllUsers, getAllUsers } from "../../../utils/firebase-admin/fbAdminFunctions";

beforeEach(async () => {
    const allUsers = await getAllUsers();

    if (allUsers?.length) {
        await deleteAllUsers(allUsers.map(user => user.uid));
    }
})

describe("firebase-admin getAllUsers function tests", () => {
    test("returns an array of user detail objects upon successful request", async () => {
        const testUsers = [
            {
                email: "test1@gmail.com",
                password: "testpass1"
            },
            {
                email: "test2@gmail.com",
                password: "testpass2"
            },
            {
                email: "test3@gmail.com",
                password: "testpass3"
            }
        ];

        await Promise.all(testUsers.map(userDetails => createUser(userDetails.email, userDetails.password)));

        const expected = await getAllUsers();

        expect(Array.isArray(expected)).toBeTruthy();

        expected?.forEach(testUser => {
            expect(typeof testUser).toBe("object");
            expect(Array.isArray(testUser)).toBeFalsy();
        })
    });
    test("each user object has uid and email properties", async () => {
        const testUsers = [
            {
                email: "test1@gmail.com",
                password: "testpass1"
            },
            {
                email: "test2@gmail.com",
                password: "testpass2"
            },
            {
                email: "test3@gmail.com",
                password: "testpass3"
            }
        ];

        await Promise.all(testUsers.map(userDetails => createUser(userDetails.email, userDetails.password)));

        const expected = await getAllUsers();

        expect(Array.isArray(expected)).toBeTruthy();

        expected?.forEach(testUser => {
            expect(testUser).toHaveProperty("uid");
            expect(testUser).toHaveProperty("email");
        })
    });
});