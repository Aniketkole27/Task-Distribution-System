import express from "express";
import { ensureAuthenticated } from "../MiddleWare/Auth.js";
import {
    handleCreateProject,
    handleGetAllProjects,
    handleGetProjectById,
    handleUpdateProjectById,
    handleDeleteProjectById,
    handleGetAllTaskByProjectId
} from "../Controller/projectController.js"

import {
    // handleGetAllTaskByProjectId,
    handleCreateTaskByProjectId
} from "../Controller/taskController.js"

export const projectRoutes = express.Router();

// All Project Routes   

projectRoutes.get("/", ensureAuthenticated, handleGetAllProjects)
projectRoutes.get("/:id", ensureAuthenticated, handleGetProjectById)
projectRoutes.post("/create", ensureAuthenticated, handleCreateProject)
projectRoutes.put("/update/:id", ensureAuthenticated, handleUpdateProjectById)
projectRoutes.delete("/delete/:id", ensureAuthenticated, handleDeleteProjectById)

// All Project Tasks Route

projectRoutes.get("/tasks/:id", ensureAuthenticated, handleGetAllTaskByProjectId)
projectRoutes.post("/tasks/create/:id", ensureAuthenticated, handleCreateTaskByProjectId)
