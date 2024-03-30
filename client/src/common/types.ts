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

export type TEvent = {
    title: string,
    dateStart: Date,
    dateEnd: Date,
    address: string,
    images: string[],
    coordinates: [number, number],
    details: string,
    summary: string,
    tag: string[],
    attendees: string[]|[],
    price: number,
    openPrice: boolean,
    organizer: string,
    createdAt?: string | Date,
    updatedAt?: string | Date,
    __v?: number
  };