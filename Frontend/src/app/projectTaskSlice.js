import { createSlice, createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit"
import API from "../api/axiosInstance"

const initialState = {
    projectTasks: [],
    filters: {
        status: "all",
        priority: "all"
    },
    loading: false,
    error: null
}

const fetchTasksOnProjectId = createAsyncThunk(
    "task/fetchAllTasks",
    async (projectId, { rejectWithValue }) => {
        try {
            const response = await API.get(`/api/task/${projectId}`)
            return response.data.data
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch tasks")
        }
    })

const addTaskInProjectWithId = createAsyncThunk(
    "task/addTaskInProjectWithId",
    async ({ projectId, taskData }, { rejectWithValue }) => {
        try {
            const response = await API.post(`/api/task/create/${projectId}`, taskData)
            return response.data.data
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to add task")
        }
    })


const projectTaskSlice = createSlice({
    name: "projectTask",
    initialState: initialState,
    reducers: {
        setFilters: (state, action) => {
            state.filters = { ...state.filters, ...action.payload };
        },
        resetFilters: (state) => {
            state.filters = initialState.filters;
        }
    },
    extraReducers: (builder) => {
        builder.
            // fetch all task on project id
            addCase(fetchTasksOnProjectId.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTasksOnProjectId.fulfilled, (state, action) => {
                state.loading = false;
                state.projectTasks = action.payload;
            })
            .addCase(fetchTasksOnProjectId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // add new task in project on project id
            .addCase(addTaskInProjectWithId.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addTaskInProjectWithId.fulfilled, (state, action) => {
                state.loading = false;
                state.projectTasks.push(action.payload);
            })
    }

})

export const { setFilters, resetFilters } = projectTaskSlice.actions;
export {
    fetchTasksOnProjectId,
    addTaskInProjectWithId
}
export default projectTaskSlice.reducer;