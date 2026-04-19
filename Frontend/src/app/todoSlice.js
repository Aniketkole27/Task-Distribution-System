import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import API from "../api/axiosInstance"
import { useSelector } from "react-redux"

const initialState = {
    allTask: [],
    callTodos: 0,
    loading: false,
    error: null,
}

// const currentUser = useSelector((state) => state.currentUser.profile)
// const editTodos = async (id, updateData) => {
//     try {
//         const response = await API.put(`api/todos/update/${id}`, updateData)
//         return response.data
//     } catch (error) {
//         console.error("Error updating todo:", error)
//     }
// }
// const deleteTodos = async (id) => {
//     try {
//         const response = await API.delete(`api/todos/delete/${id}`)
//         return response.data
//     } catch (error) {
//         console.error("Error deleting todo:", error)
//     }
// }
// const addTodos = async (taskData) => {
//     try {
//         const response = await API.post(`api/todos/add`, taskData)
//         triggerRefetch(state.callTodos + 1)
//         return response.data
//     } catch (error) {
//         console.error("Error adding todo:", error)
//     }
// }

// 👉 Get all todos
export const fetchTodos = createAsyncThunk(
    "todos/fetchTodos",
    async (_, { rejectWithValue }) => {
        try {
            const response = await API.get("/api/todos");
            const todos = response.data.todos || [];
            console.log("Fetching todos = ",todos)
            // Standardize: move 'todo' properties to the top level so state is consistent
            return todos.map(t => t.todo ? { ...t.todo, _id: t._id } : t);
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch todos");
        }
    }
);

// 👉 Add todo
export const addTodo = createAsyncThunk(
    "todos/addTodo",
    async (taskData, { rejectWithValue }) => {
        try {
            const response = await API.post("/api/todos/add", taskData);
            return response.data.todo || response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to add todo");
        }
    }
);

// 👉 Edit todo
export const editTodo = createAsyncThunk(
    "todos/editTodo",
    async ({ id, title }, { rejectWithValue }) => {
        try {
            const response = await API.put(`/api/todos/update/${id}`, { title });
            return response.data.todo || response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to update todo");
        }
    }
);

// 👉 Delete todo
export const deleteTodo = createAsyncThunk(
    "todos/deleteTodo",
    async (id, { rejectWithValue }) => {
        try {
            await API.delete(`/api/todos/delete/${id}`);
            return id; // return deleted id
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to delete todo");
        }
    }
);

// 👉 Toggle complete
export const toggleTodo = createAsyncThunk(
    "todos/toggleTodo",
    async (task, { rejectWithValue }) => {
        try {
            const response = await API.put(`/api/todos/update/${task._id}`, {
                isCompleted: !task.isCompleted,
            });
            return response.data.todo || response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to toggle todo");
        }
    }
);




const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        // triggerRefetch(state) {
        //     state.callTodos += 1;
        // },

        // setTask(state, action) {
        //     state.allTask = action.payload
        // },

        // handleAdd(state, action) {
        //     state.allTask.push(action.payload)
        //     state.allTask.push(addTodos(action.payload))
        // },

        // handleComplete(state, action) {
        //     const task = state.allTask.find(t => t._id === action.payload._id)
        //     if (task) {
        //         task.isCompleted = !task.isCompleted
        //     }

        //     editTodos(action.payload._id, { isCompleted: !action.payload.isCompleted })
        // },

        // handleEdit(state, action) {
        //     const task = state.allTask.find(t => (t._id === action.payload.id || t.id === action.payload.id))
        //     if (task) {
        //         task.title = action.payload.title
        //     }
        //     editTodos(action.payload.id, { title: action.payload.title })
        // },

        // handleDelete(state, action) {
        //     state.allTask = state.allTask.filter(t => t._id !== action.payload)
        //     deleteTodos(action.payload)
        // }

        builder
            // 👉 fetchTodos
            .addCase(fetchTodos.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.loading = false;
                state.allTask = action.payload;
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // 👉 addTodo
            .addCase(addTodo.fulfilled, (state, action) => {
                state.allTask.push(action.payload);
            })

            // 👉 editTodo
            .addCase(editTodo.fulfilled, (state, action) => {
                const index = state.allTask.findIndex(
                    (t) => t._id === action.payload._id
                );
                if (index !== -1) {
                    state.allTask[index] = action.payload;
                }
            })

            // 👉 deleteTodo
            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.allTask = state.allTask.filter(
                    (t) => t._id !== action.payload
                );
            })

            // 👉 toggleTodo
            .addCase(toggleTodo.fulfilled, (state, action) => {
                const index = state.allTask.findIndex(
                    (t) => t._id === action.payload._id
                );
                if (index !== -1) {
                    state.allTask[index] = action.payload;
                }
            });
    }
})

// export const {
//     setTask,
//     handleAdd,
//     handleComplete,
//     handleEdit,
//     handleDelete,
//     callForData,
//     triggerRefetch
// } = todoSlice.actions


export default todoSlice.reducer;
