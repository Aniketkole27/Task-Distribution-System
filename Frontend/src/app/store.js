import { configureStore } from '@reduxjs/toolkit'
import currentUserSlice from './currentUserSlice'
import teamSlice from './teamSlice'
import projectDataSlice from "./projectDataSlice"
import todoSlice from "./todoSlice"
import projectTaskSlice from "./projectTaskSlice"


export const store = configureStore({
    reducer: {
        currentUser: currentUserSlice,
        team: teamSlice,
        projectData: projectDataSlice,
        todos: todoSlice,
        projectTask: projectTaskSlice
    }
})