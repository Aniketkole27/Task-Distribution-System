import { createSlice, createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit"
import API from "../api/axiosInstance"
import { updateTaskStatus } from "./jiraSlice"

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

const updateTaskStatusApproveOrReject = createAsyncThunk(
    "task/updateTaskStatusApproveOrReject",
    async ({ taskId, status, adminNote }, { rejectWithValue }) => {
        try {
            const response = await API.put(`/api/task/${taskId}`, { status, adminNote })
            return response.data.data
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to update task")
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
            // Update task in project task list when status is changed
            .addCase(updateTaskStatus.fulfilled, (state, action) => {
                state.projectTasks = state.projectTasks.map(task =>
                    task._id === action.payload._id ? action.payload : task
                );
            })

        // update review status approve or rejects
        // .addCase(updateTaskStatusApproveOrReject.pending, (state, action) => {
        //     state.loading = true;
        // })
        // .addCase(updateTaskStatusApproveOrReject.fulfilled, (state, action) => {
        //     state.loading = false;
        //     state.projectTasks = state.projectTasks.map(task => task._id === action.payload._id ? action.payload : task)
        // })
    }

})

export const { setFilters, resetFilters } = projectTaskSlice.actions;
export {
    fetchTasksOnProjectId,
    addTaskInProjectWithId,
}
export default projectTaskSlice.reducer;