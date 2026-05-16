import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axiosInstance";

const initialState = {
    tasks: [],
    loading: false,
    error: null
}

const fetchTaskByUser = createAsyncThunk(
    "jira/fetchTaskByUser",
    async ({ userId }, { rejectWithValue }) => {
        try {
            const response = await API.get(`/api/task/user/${userId}`)
            console.log(response.data)
            const task = response.data.data
            return task
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch tasks")
        }
    }
)

const jiraSlice = createSlice({
    name: "jira",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTaskByUser.pending, (state) => {
                if (state.tasks.length === 0) {
                    state.loading = true
                }
                state.error = null
            })
            .addCase(fetchTaskByUser.fulfilled, (state, action) => {
                state.loading = false
                state.tasks = action.payload
            })
            .addCase(fetchTaskByUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})
export { fetchTaskByUser }
export default jiraSlice.reducer