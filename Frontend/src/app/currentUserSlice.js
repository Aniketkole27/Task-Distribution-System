import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    profile: {},
    allUsers: [],
    userSearch: ""
};

const currentUserSlice = createSlice({
    name: "currentUser",
    initialState,

    reducers: {
        updateProfile: (state, action) => {
            state.profile = action.payload
        },
        setAllUsers: (state, action) => {
            state.allUsers = action.payload
        },
        setUserSearch: (state, action) => {
            state.userSearch = action.payload
        }
    }
})

export const { updateProfile, setAllUsers, setUserSearch } = currentUserSlice.actions;
export default currentUserSlice.reducer;