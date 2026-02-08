import { createAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
    projectSearch: "",
    selected: "all"
}

const projectSlice = createSlice({
    name: "project",
    initialState,

    reducers: {
        setProjectSearch(state, action) {
            state.projectSearch = action.payload
        },
        setSelected(state, action) {
            state.selected = action.payload
        }
    }
})

export const { setProjectSearch, setSelected } = projectSlice.actions;
export default projectSlice.reducer; 