import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    team: [],
    openMenu: null,
    buttonClick: null,
    selectedId: null,
    isDetailsSidebarOpen: false,
    selectedMemberId: null
}

const teamSlice = createSlice({
    name: "team",
    initialState,

    reducers: {
        setTeam(state, action) {
            state.team = action.payload;
        },

        setOpenMenu(state, action) {
            state.openMenu = action.payload;
        },

        setDetailsSidebarOpen(state, action) {
            state.isDetailsSidebarOpen = action.payload;
        },

        setSelectedMemberId(state, action) {
            state.selectedMemberId = action.payload;
        },
        
        handleButtonClick(state, action){
            state.buttonClick = action.payload;
        }
        
    }
})


export const { setOpenMenu, handleButtonClick, setDetailsSidebarOpen, setSelectedMemberId } = teamSlice.actions;
export default teamSlice.reducer;