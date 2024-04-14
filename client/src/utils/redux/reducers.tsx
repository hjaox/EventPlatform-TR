import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userDetails: {
        uid: "",
        displayName: "",
        email: "",
        accessToken: "",
    },
    isLoggedIn: false,
    buyerDetails: {
        name: "",
        email: "",
        eventId: "",
        price: 0,
        quantity: 1
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

        storeBuyerDetails: (state, { payload }) => {
            state.buyerDetails = { ...payload };
        },
        clearBuyerDetails: (state) => {
            state.buyerDetails = { ...initialState.buyerDetails }
        }
    }
});

export const actions = profileSlice.actions;

export default profileSlice.reducer;