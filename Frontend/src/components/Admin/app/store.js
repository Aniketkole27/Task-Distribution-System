import { configureStore } from '@reduxjs/toolkit'
import currentTabSlice from './currentTabSlice'
import teamSlice from './teamSlice'
import projectDataSlice from "../app/projectDataSlice"
import todoSlice from "../app/todoSlice"


export const store = configureStore({
    reducer: {
        currentTab: currentTabSlice,
        team: teamSlice,
        projectData: projectDataSlice,
        todos: todoSlice
    }
})