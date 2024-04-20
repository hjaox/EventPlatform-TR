import { TTestUser, TEvent, TImagesData } from "../../common/types";
import mongoose from "mongoose";
import UserModel from "../../mongo/models/user.model";
import EventsModel from "../../mongo/models/event.model";
import TagModel from "../../mongo/models/tag.model";
import { uploadToFirebase } from "../../utils/firebase/fbFunctions";

export default async function seed(usersData: TTestUser[], eventsData: TEvent[], tagsData: { tags: string[] }, imagesData?: TImagesData) {
    try {
        await mongoose.connection.dropDatabase();
        await UserModel.create(usersData);
        await EventsModel.create(eventsData);
        await TagModel.create(tagsData);

        if (imagesData) {
            const allEventId = await Promise.all(Object.entries(imagesData).map(([eventTitle]) => {
                return EventsModel.findOne({ title: eventTitle }, "_id title");
            }));

            // eslint-disable-next-line  @typescript-eslint/no-explicit-any
            await Promise.all(allEventId.map((event: any) => {
                if (event.title && event.id)
                    return uploadToFirebase(imagesData[event.title], event.id)
            }));
        }

    } catch (err) {
        console.log("Seeding failed: ", err);
        return Promise.reject();
    }
}