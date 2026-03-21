import { configureStore } from '@reduxjs/toolkit'
import currentUserSlice from './currentUserSlice'
import teamSlice from './teamSlice'
import projectDataSlice from "./projectDataSlice"
import todoSlice from "./todoSlice"


export const store = configureStore({
    reducer: {
        currentUser: currentUserSlice,
        team: teamSlice,
        projectData: projectDataSlice,
        todos: todoSlice
    }
})