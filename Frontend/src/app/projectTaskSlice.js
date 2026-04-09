import { createAction, createSlice } from "@reduxjs/toolkit"
import { setProjectSearch } from "./projectDataSlice"

const initialState = {
    projectTasks: []
}

const projectTaskSlice = createSlice({
    name: "projectTask",
    initialState: initialState,
    reducers: {
        setProjectTask(state, action) {
            state.projectSearch = action.payload
        }
    }
})

export const { setProjectTask } = projectTaskSlice.actions;
export default projectTaskSlice.reducer;