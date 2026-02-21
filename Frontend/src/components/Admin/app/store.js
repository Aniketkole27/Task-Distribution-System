import { configureStore } from '@reduxjs/toolkit'
import currentTabSlice from './currentTabSlice'
import teamSlice from './teamSlice'
import projectDataSlice from "../app/projectDataSlice"


export const store = configureStore({
    reducer: {
        currentTab: currentTabSlice,
        team: teamSlice,
        projectData: projectDataSlice
    }
})