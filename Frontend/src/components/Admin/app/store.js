import { configureStore } from '@reduxjs/toolkit'
import currentTabSlice from './currentTabSlice'
import teamSlice from './teamSlice'
import projectSlice from './projectSlice'


export const store = configureStore({
    reducer: {
        currentTab: currentTabSlice,
        team: teamSlice,
        project: projectSlice
    }
})