import auth from "./fbAdminAuth";

export async function getAllUsers() {
    try {
        const { users } = await auth.listUsers(1000);

        return users.map(UserRecord => ({ uid: UserRecord.uid, email: UserRecord.email }));
    } catch (err) {
        return null;
    }

}

export async function deleteAllUsers(uid: string[]) {
    try {
        const result = await auth.deleteUsers(uid);
        if (result.failureCount) console.log("Something went wrong.", result.errors);
    } catch (err) {
        return null;
    }
}

export async function createUser(email: string, password: string) {
    try {
        const result = await auth.createUser({ email, password });

        return { uid: result.uid, email: result.email };
    } catch (err) {
        return null;
    }
}

export async function verifyIdToken(uidToken: string) {
    try {
        const decodedToken = await auth.verifyIdToken(uidToken);

        return decodedToken;
    } catch (err) {
        return null;
    }
}