import mongoose from "mongoose";

export type TUser = {
  _id: string,
  name: string,
  email: string,
  __v?: number
};

export type TTestUser = {
  _id?: string,
  password: string,
  name: string,
  email: string,
  eventsAttending?: any[],
  eventsOrganized?: any[],
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
  attendees: mongoose.Schema.Types.ObjectId[] | [],
  price: number,
  openPrice: boolean,
  organizer: string,
  createdAt?: string | Date,
  updatedAt?: string | Date,
  __v?: number
};

export type TMongoError = {
  code?: number
}