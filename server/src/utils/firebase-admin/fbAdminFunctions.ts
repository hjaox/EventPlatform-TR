import auth from "./fbAdminAuth";

export async function getAllUsers() {
    try {
        const { users } = await auth.listUsers(1000);

        return users.map(UserRecord => ({ uid: UserRecord.uid, email: UserRecord.email }));
    } catch (err) {
        console.log("Error listing users", err);
        return null;
    }

}

export async function deleteAllUsers(users: string[]) {
    try {
        const result = await auth.deleteUsers(users);
        if (result.failureCount) console.log("Something went wrong.", result.errors);
    } catch (err) {
        console.log("Error deleting users", err);
        return null;
    }
}

export async function createUser(email: string, password: string) {
    try {
        const result = await auth.createUser({ email, password });

        return { uid: result.uid, email: result.email };
    } catch (err) {
        console.log("Error creating user", err);
        return null;
    }
}