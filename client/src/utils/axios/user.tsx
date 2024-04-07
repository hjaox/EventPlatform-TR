import instance from "./instance";

export async function loginUser(email: string, password: string) {
    try {
        const { data: { userDetails } } = await instance
            .post("/login", { email, password })

        return {
            uid: userDetails._id,
            displayName: userDetails.name,
            email: userDetails.email,
            accessToken: userDetails.accessToken,
        };
    } catch (err) {
        return null
    }
}