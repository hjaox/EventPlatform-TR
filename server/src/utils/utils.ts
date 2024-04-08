import { TMongoError } from "../common/types";

export function handleMongoDBError(err: TMongoError) {
    if(err.code === 11000) {
        return {status: 400, message: "Email already exist"};
    }

    return {status: 400, message: "Unhandled Error"};
}
