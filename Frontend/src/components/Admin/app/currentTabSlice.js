import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: "dashboard",
    subValue: "projects",
    projectInfo: false
};

const currentTabSlice = createSlice({
    name: "currentTab",
    initialState,

    reducers: {
        setCurrentTab: (state, action) => {
            state.value = action.payload;
        },

        // setProject: (state,action) =>{
        //     state.subValue = action.payload;
        // }

        setProjectInfo: (state, action) => {
            state.projectInfo = action.payload
        }
    }
})

export const { setCurrentTab, setProjectInfo } = currentTabSlice.actions;
export default currentTabSlice.reducer;