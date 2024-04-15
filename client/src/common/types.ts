import { EditorState } from "draft-js";

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
    details: string,
    summary: string,
    tag: string,
    price: number,
    openPrice: boolean,
    createdAt?: string | Date,
    updatedAt?: string | Date,
    __v?: number
};

export type TEvent = TNewEvent & { _id: string };

export type TReduxUser = {
    userDetails: {
        uid: string,
        displayName: string,
        email: string,
        accessToken: string,
    },
    isLoggedIn: boolean,
    buyerDetails: {
        name: string,
        email: string,
        eventId: string,
        price: number,
        quantity: number
    }
};

export type TEventHeaderForm = {
    setEditorTitleState: React.Dispatch<React.SetStateAction<EditorState>>,
    editorTitleState: EditorState,
    setEditorSummaryState: React.Dispatch<React.SetStateAction<EditorState>>,
    editorSummaryState: EditorState,
    price: number
    setPrice: React.Dispatch<React.SetStateAction<number>>,
    formError: {
        title: boolean;
        dateStart: boolean;
        dateEnd: boolean;
        address: boolean;
        price: boolean,
        details: boolean;
        summary: boolean;
    },
    setOpenPrice: React.Dispatch<React.SetStateAction<boolean>>,
    openPrice: boolean
};