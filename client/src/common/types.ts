export type TUser = {
    _id: string,
    name: string,
    email: string,
    eventsAttending?: any[],
    eventsOrganized?: any[],
    createdAt?: string | Date,
    updatedAt?: string | Date,
    __v?: number
};

export type TNewEvent = {
    title: string,
    dateStart: Date,
    dateEnd: Date,
    address: string,
    images: string[],
    details: string,
    summary: string,
    tag: string[],
    price: number,
    openPrice: boolean,
    isFree: boolean,
    createdAt?: string | Date,
    updatedAt?: string | Date,
    __v?: number
};

export type TEvent = TNewEvent & {_id: string};

export type TReduxUser = {
    userDetails: {
        uid: string,
        displayName: string,
        email: string,
        accessToken: string,
    },
    isLoggedIn: boolean,
    eventId: string
}