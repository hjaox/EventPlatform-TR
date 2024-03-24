import { createUser, deleteAllUsers, getAllUsers } from "../../../utils/firebase-admin/fbAdminFunctions";

beforeAll(async () => {
    const allUsers = await getAllUsers();

    if (allUsers?.length) {
        await deleteAllUsers(allUsers.map(user => user.uid));
    }
})

describe("firebase-admin deleteAllUsers function tests", () => {
    test("deletes all users in firebase authentication upon successful request", async () => {
        const testUsers = [
            {
                email: "test1.0@gmail.com",
                password: "testpass1"
            },
            {
                email: "test1.1@gmail.com",
                password: "testpass1.1"
            },
            {
                email: "test1.2@gmail.com",
                password: "testpass1.2"
            }
        ];

        await Promise.all(testUsers.map(userDetails => createUser(userDetails.email, userDetails.password)));

        const allUsersBeforeDelete = await getAllUsers();

        expect(allUsersBeforeDelete?.length).toBeTruthy();

        if (allUsersBeforeDelete && allUsersBeforeDelete.length) {
            await deleteAllUsers(allUsersBeforeDelete.map(user => user.uid));
        } else {
            throw new Error("Unexpected null or empty allUsersBeforeDelete");
        }

        const allUsersAfterDelete = await getAllUsers();

        if (allUsersAfterDelete) {
            expect(allUsersAfterDelete.length).toBeFalsy()
        } else {
            throw new Error("Unexpected null allUsersAfterDelete");
        }
    });
    test("returns null if the request is failed", async() => {
        const testValue = await deleteAllUsers([""]);
        expect(testValue).toBeNull();
    });
});