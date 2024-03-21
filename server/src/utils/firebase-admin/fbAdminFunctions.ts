import auth from "./fbAdminAuth";

export async function getAllUsers() {
    try {
        const { users } = await auth.listUsers(1000);

        return users.map(UserRecord => UserRecord.uid);
    } catch (err) {
        console.log("Error listing Users", err);
    }

}

export async function deleteAllUsers(users: string[]) {
    try{
        const result = await auth.deleteUsers(users);
        if(result.failureCount) console.log("Something went wrong.", result.errors);
    } catch(err) {
        console.log("Error deleting users", err);
    }
}