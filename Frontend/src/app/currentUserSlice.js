import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    profile: {}
};

const currentUserSlice = createSlice({
    name: "currentUser",
    initialState,

    reducers: {
        updateProfile: (state, action) => {
            state.profile = action.payload
        }
    }
})

export const { updateProfile } = currentUserSlice.actions;
export default currentUserSlice.reducer;