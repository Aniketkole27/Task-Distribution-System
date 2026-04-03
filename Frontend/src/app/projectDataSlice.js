import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
    projectSearch: "",
    selected: "all"
}

const projectDataSlice = createSlice({
    name: "projectData",
    initialState,
    reducers: {
        setData: (state, action) => {
            state.data = action.payload;
        },
        setProjectSearch(state, action) {
            state.projectSearch = action.payload
        },
        setSelected(state, action) {
            state.selected = action.payload
        }
    }
})

export const { setData, setProjectSearch, setSelected } = projectDataSlice.actions;
export default projectDataSlice.reducer; 
