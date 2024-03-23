export type TUser = {
  _id: string,
  name: string,
  email: string,
  eventsAttending?: any[],
  eventsOrganized?: any[],
  createdAt?: string | Date,
  updatedAt?: string | Date,
  __v?: number
}

export type TTestUser = {
  _id: string,
  password: string,
  name: string,
  email: string,
  eventsAttending?: any[],
  eventsOrganized?: any[],
  createdAt?: string | Date,
  updatedAt?: string | Date,
  __v?: number
}