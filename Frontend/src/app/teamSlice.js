import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    team: [],
    openMenu: null,
    buttonClick: null,
    selectedId : null
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
        
        handelButtonClick(state, action){
            state.buttonClick = action.payload.buttonClick;
       }
        
    }
})


export const { setOpenMenu,handelButtonClick } = teamSlice.actions;
export default teamSlice.reducer;