import instance from "./instance";

export async function loginUser(email: string, password: string) {
    try {
        const { data: { userDetails } } = await instance
            .post("/user/login", { email, password })

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

export async function checkEmailIfExist(email: string) {
    try {
        const { data: {userDetails} } = await instance
        .get(`/user/${email}`)

        return userDetails
    } catch(err) {
        return null;
    }
}

export async function registerUser(name:string, email: string, password: string) {
    try{
        const { data: {newUser} } = await instance
        .post(`/user/register`, {name, email, password});

        return newUser;
    } catch(err) {
        console.log(err)
        return null;
    }
}

export async function postUser(name: string, email: string) {
    try{
        const { data: {newUser} } = await instance
        .post(`/user`, {name, email});

        return newUser;
    } catch(err) {
        console.log(err)
        return null;
    }
}