import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
        value: "dashboard",
        subValue: "projects"
};

const currentTabSlice = createSlice({
    name: "currentTab",
    initialState,

    reducers: {
        setCurrentTab: (state,action) =>{
            state.value = action.payload;
        },

        setProject: (state,action) =>{
            state.subValue = action.payload;
        }
    }
})

export const {setCurrentTab, setProject} = currentTabSlice.actions;
export default currentTabSlice.reducer;