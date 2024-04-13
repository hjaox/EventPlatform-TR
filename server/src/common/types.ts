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
  details: string,
  summary: string,
  tag: string,
  price: number,
  openPrice: boolean,
  isFree?: boolean,
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
  summary?: string,
  tag?: string,
  price?: number,
  openPrice?: boolean,
  isFree?: boolean,
};

export type TError = {
  code?: number | string,
  message?: string,
  status?: number,
}