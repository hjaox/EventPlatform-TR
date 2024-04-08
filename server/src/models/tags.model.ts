import TagModel from "../mongo/models/tag.model";

export async function fetchAllTags() {
    try {
        const [{tags}] =  await TagModel.find({});

        return tags;
    } catch(err) {
        return Promise.reject({status: 400, message: "Bad request"})
    }
}