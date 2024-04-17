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
    price: number | null
    setPrice: React.Dispatch<React.SetStateAction<number | null>>,
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

export type TAboutForm = {
    editorDetailsState: EditorState,
    setEditorDetailsState: React.Dispatch<React.SetStateAction<EditorState>>,
    setTag: React.Dispatch<React.SetStateAction<string>>,
    formError: {
        title: boolean;
        dateStart: boolean;
        dateEnd: boolean;
        address: boolean;
        price: boolean,
        details: boolean;
        summary: boolean;
    },
};

export type TDateAndLocation = {
    startDate: Date,
    setStartDate: React.Dispatch<React.SetStateAction<Date>>,
    endDate: Date,
    setEndDate: React.Dispatch<React.SetStateAction<Date>>,
    editorAddressState: EditorState,
    setEditorAddressState: React.Dispatch<React.SetStateAction<EditorState>>,
    formError: {
        title: boolean;
        dateStart: boolean;
        dateEnd: boolean;
        address: boolean;
        price: boolean;
        details: boolean;
        summary: boolean;
    }
};

export type TEventForm = {
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setNewEvent: React.Dispatch<React.SetStateAction<TEvent | null>>,
    setRedirect: React.Dispatch<React.SetStateAction<boolean>>,
    setCreateEventError: React.Dispatch<React.SetStateAction<boolean>>,
    eventToEdit?: TEvent | null,
    setEventToEdit?: React.Dispatch<React.SetStateAction<TEvent | null>>
};

export type TPatchEvent = {
    title?: string,
    dateStart?: Date,
    dateEnd?: Date,
    address?: string,
    details?: string,
    summary?: string,
    tag?: string,
    price?: number,
    openPrice?: boolean
};

export type TEventCard = {
    event: TEvent,
    eventList: TEvent[],
    setEventList: React.Dispatch<React.SetStateAction<TEvent[]>>
};

export type TTagCard = {
    tag: string,
    selectedTag: string,
    setSelectedTag: React.Dispatch<React.SetStateAction<string>>,
    key: number
};