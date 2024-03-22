import { createUser, deleteAllUsers, getAllUsers } from "../../../utils/firebase-admin/fbAdminFunctions";

beforeEach(async () => {
    const allUsers = await getAllUsers();

    if (allUsers?.length) {
        await deleteAllUsers(allUsers.map(user => user.uid));
    }
})

describe("firebase-admin createUser function tests", () => {
    test("returns an array of user detail objects upon succesful request", async () => {
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

        testUsers.forEach(testUser => {
            expect(typeof testUser).toBe("object");
            expect(Array.isArray(testUser)).toBeFalsy();
        })
    });
    test("returns user email and uid upon successful request", async () => {
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

        testUsers.forEach(testUser => {
            expect(expected?.some(expectedUser => expectedUser.email === testUser.email)).toBeTruthy();
        })
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