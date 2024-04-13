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
    }
});

export const actions = profileSlice.actions;

export default profileSlice.reducer;