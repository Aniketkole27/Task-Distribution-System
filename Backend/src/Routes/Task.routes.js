import express from 'express';

import {
    getAllTaskByProjectId,
    createTaskByProjectId
} from "../Controller/Task.controller.js"

export const taskRoutes = express.Router()

taskRoutes.get("/:id", getAllTaskByProjectId)
taskRoutes.post("/task/:id", createTaskByProjectId)

