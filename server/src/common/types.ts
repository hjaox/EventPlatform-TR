import mongoose from "mongoose";

export type TUser = {
  _id: mongoose.ObjectId,
  name: string,
  email: string,
  __v?: number
};

export type TTestUser = {
  name: string,
  email: string,
  password: string,
};

export type TAttendees = {
  name: string,
  email: string,
  quantity: number
}

export type TEvent = {
  title: string,
  dateStart: Date,
  dateEnd: Date,
  address: string,
  details: string,
  summary: string,
  attendees?: TAttendees[],
  tag: string,
  price: number,
  openPrice: boolean,
  createdAt?: string | Date,
  updatedAt?: string | Date,
  __v?: number
};

export type TEventUpdate = {
  title?: string,
  dateStart?: Date,
  dateEnd?: Date,
  address?: string,
  details?: string,
  attendees?: TAttendees[],
  summary?: string,
  tag?: string,
  price?: number,
  openPrice?: boolean,
};

export type TError = {
  code?: number | string,
  message?: string,
  status?: number,
};

export type TImagesData = {
  [key : string] : string
}