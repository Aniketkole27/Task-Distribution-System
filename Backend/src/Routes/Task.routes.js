import express from 'express';
import { ensureAuthenticated } from '../MiddleWare/Auth.js'

import {
    getAllTaskByProjectId,
    createTaskByProjectId,
    getAllTaskByUserId,
    updateTaskStatus,
    handlemoveForReview
} from "../Controller/Task.controller.js"

export const taskRoutes = express.Router()

taskRoutes.get("/:id", ensureAuthenticated, getAllTaskByProjectId)
taskRoutes.post("/create/:id", ensureAuthenticated, createTaskByProjectId)


taskRoutes.get("/user/:id", ensureAuthenticated, getAllTaskByUserId)
taskRoutes.put("/:id", ensureAuthenticated, updateTaskStatus)
taskRoutes.put("/review/:id", ensureAuthenticated, handlemoveForReview)