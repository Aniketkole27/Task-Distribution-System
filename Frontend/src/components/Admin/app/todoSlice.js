import { createSlice } from "@reduxjs/toolkit"
import { Satellite, Stethoscope } from "lucide-react"

const initialState = {
    allTask: [{
        id: "0",
        priority: "high",
        title: "Complete Python course 0",
        isCompleted: false,
        dueDate: "10/3/2026"
    }]
}

const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        setTask(state, action) {
            state.allTask = action.payload
        },

        handleAdd(state, action) {
            state.allTask.push(action.payload)
        },

        handleComplete(state, action) {
            const task = state.allTask.find(
                task => task.id === action.payload
            )
            if (task) {
                task.isCompleted = !task.isCompleted
            }
        },

        handleEdit(state, action) {
            const task = state.allTask.find((task) => task.id === action.payload.id)
            if (task) {
                task.title = action.payload.title
            }
        },

        handleDelete(state, action) {
            state.allTask = state.allTask.filter(task => task.id !== action.payload)
        }
    }
})

export const { handleAdd, handleComplete, handleEdit, handleDelete } = todoSlice.actions
export default todoSlice.reducer;