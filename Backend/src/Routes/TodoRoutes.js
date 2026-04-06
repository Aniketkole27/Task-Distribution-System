import express from 'express'
import { ensureAuthenticated } from '../MiddleWare/Auth.js'
import {
    handleGetAllTodos,
    handleAddTodo,
    handleUpdateTodo,
    handleDeleteTodo
} from '../Controller/todoController.js'

export const todoRoutes = express.Router()

// All Routes

todoRoutes.get("/", ensureAuthenticated, handleGetAllTodos)
todoRoutes.post("/add", ensureAuthenticated, handleAddTodo)
todoRoutes.put("/update/:id", ensureAuthenticated, handleUpdateTodo)
todoRoutes.delete("/delete/:id", ensureAuthenticated, handleDeleteTodo)
