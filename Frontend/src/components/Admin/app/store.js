import { configureStore } from '@reduxjs/toolkit'
import currentTabSlice from './currentTabSlice'


export const store = configureStore({
    reducer: {
        currentTab: currentTabSlice,
    }
})