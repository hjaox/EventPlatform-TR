import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userDetails: {
        uid: "",
        displayName: "",
        email: "",
        accessToken: "",
    },
    eventId: "",
    isLoggedIn: false,
    buyerDetails: {
        name: "",
        email: ""
    }
}

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        login: (state, { payload }) => {
            state.isLoggedIn = true;
            state.userDetails = { ...payload };
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.userDetails = { ...initialState.userDetails };
        },
        storeEventId: (state, { payload }) => {
            state.eventId = payload;
        },
        storeBuyerDetails: (state, { payload }) => {
            state.buyerDetails = { ...payload };
        },
        clearEventId: (state) => {
            state.eventId = "";
        },
        clearBuyerDetails: (state) => {
            state.buyerDetails = { ...initialState.buyerDetails }
        }
    }
});

export const actions = profileSlice.actions;

export default profileSlice.reducer;