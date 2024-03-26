import instance from "./instance";

export async function getAllTags() {
    const { data: { tags } } = await instance.get("/tags")
    return tags
}