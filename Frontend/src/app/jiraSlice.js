import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axiosInstance";

const initialState = {
    tasks: [],
    loading: false,
    error: null,
    filters: {
        search: '',
        project: '',
        assignedBy: '',
        priority: ''
    }
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

const updateTaskStatus = createAsyncThunk(
    "jira/updateTaskStatus",
    async ({ taskId, status, adminNote }, { rejectWithValue }) => {
        try {
            const payload = { status };
            if (adminNote !== undefined) payload.adminNote = adminNote;
            const response = await API.put(`/api/task/${taskId}`, payload)
            return response.data.data
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to update task")
        }
    }
)

const moveForReview = createAsyncThunk(
    "jira/moveForReview",
    async ({ taskId, submitDescription }, { rejectWithValue }) => {
        try {
            const response = await API.put(`/api/task/review/${taskId}`, { submitDescription })
            return response.data.data
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to update task review")
        }
    }
)

const jiraSlice = createSlice({
    name: "jira",
    initialState,
    reducers: {
        setFilters: (state, action) => {
            state.filters = { ...state.filters, ...action.payload };
        }
    },
    extraReducers: (builder) => {
        builder
            // fetch all task by user id
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

            // update task status
            .addCase(updateTaskStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateTaskStatus.fulfilled, (state, action) => {
                state.loading = false;
                if (state.tasks) {
                    state.tasks = state.tasks.map((task) =>
                        task._id === action.payload._id ? action.payload : task
                    )
                }
            })
            .addCase(updateTaskStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // move for review
            .addCase(moveForReview.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(moveForReview.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = state.tasks.map((task) =>
                    task._id === action.payload._id ? action.payload : task
                )
            })
            .addCase(moveForReview.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})
export const { setFilters } = jiraSlice.actions
export { fetchTaskByUser, updateTaskStatus, moveForReview }
export default jiraSlice.reducer