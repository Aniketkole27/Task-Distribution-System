import express from 'express';
import { ensureAuthenticated } from '../MiddleWare/Auth.js'

import {
    getAllTaskByProjectId,
    createTaskByProjectId
} from "../Controller/Task.controller.js"

export const taskRoutes = express.Router()

taskRoutes.get("/:id", getAllTaskByProjectId)
taskRoutes.post("/create/:id", ensureAuthenticated, createTaskByProjectId)

