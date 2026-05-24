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
        },
        updateProjectInStore(state, action) {
            const updatedProject = action.payload;
            state.data = state.data.map(project => 
                project._id === updatedProject._id ? updatedProject : project
            );
        },
        removeProjectFromStore(state, action) {
            state.data = state.data.filter(project => project._id !== action.payload);
        }
    }
})

export const { setData, setProjectSearch, setSelected, updateProjectInStore, removeProjectFromStore } = projectDataSlice.actions;
export default projectDataSlice.reducer; 
