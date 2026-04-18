import { createSlice } from "@reduxjs/toolkit"
import { Satellite, Stethoscope } from "lucide-react"
import API from "../api/axiosInstance"

const initialState = {
    allTask: [],
    callTodos: 0
}

const pendingRequests = {};
const debounceBackend = (id, callback) => {
    if (pendingRequests[id]) {
        clearTimeout(pendingRequests[id]);
    }
    pendingRequests[id] = setTimeout(() => {
        callback();
        delete pendingRequests[id];
    }, 3000);
};

const editTodos = async (id, updateData) => {
    try {
        const response = await API.put(`api/todos/update/${id}`, updateData)
        return response.data
    } catch (error) {
        console.error("Error updating todo:", error)
    }
}

const deleteTodos = async (id) => {
    try {
        const response = await API.delete(`api/todos/delete/${id}`)
        return response.data
    } catch (error) {
        console.error("Error deleting todo:", error)
    }
}

const addTodos = async (taskData) => {
    try {
        const response = await API.post(`api/todos/add`, taskData)
        triggerRefetch(state.callTodos + 1)
        return response.data
    } catch (error) {
        console.error("Error adding todo:", error)
    }
}

const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        triggerRefetch(state) {
            state.callTodos += 1;
        },
        // callForData(state, action) {
        //     state.callTodos = action.payload;
        // },
        setTask(state, action) {
            state.allTask = action.payload
        },

        handleAdd(state, action) {
            addTodos(action.payload)
            state.allTask.push(action.payload) // Instant reflection

            addTodos(action.payload)
        },

        handleComplete(state, action) {
            const task = state.allTask.find(t => t._id === action.payload._id)
            if (task) {
                task.isCompleted = !task.isCompleted
            }

            //         debounceBackend(
            //             action.payload._id,
            //             task.isCompleted,
            //             (isCompleted) => editTodos(action.payload._id, { isCompleted })
            //         )

            editTodos(action.payload._id, { isCompleted: !action.payload.isCompleted })
        },

        handleEdit(state, action) {
            const task = state.allTask.find(t => (t._id === action.payload.id || t.id === action.payload.id))
            if (task) {
                task.title = action.payload.title
            }
            editTodos(action.payload.id, { title: action.payload.title })
        },

        handleDelete(state, action) {
            state.allTask = state.allTask.filter(t => t._id !== action.payload)
            deleteTodos(action.payload)
        }

    }
})

export const { setTask, handleAdd, handleComplete, handleEdit, handleDelete, callForData, triggerRefetch } = todoSlice.actions
export default todoSlice.reducer;
