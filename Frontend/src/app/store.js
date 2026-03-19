import { configureStore } from '@reduxjs/toolkit'
import currentTabSlice from './currentTabSlice'
import teamSlice from './teamSlice'
import projectDataSlice from "./projectDataSlice"
import todoSlice from "./todoSlice"


export const store = configureStore({
    reducer: {
        currentTab: currentTabSlice,
        team: teamSlice,
        projectData: projectDataSlice,
        todos: todoSlice
    }
})