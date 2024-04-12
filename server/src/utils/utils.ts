import { TError } from "../common/types";

export function handleMongoDBError(err: TError) {
    if(err.code === "auth/email-already-in-use") {
        return {status: 400, message: "Email already exist"};
    }

    return {status: 400, message: "Unhandled Error"};
}
