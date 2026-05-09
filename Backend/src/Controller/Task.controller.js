import { User } from '../models/users.model.js'
import { Task } from '../models/task.model.js';
import { Project } from '../models/project.model.js';

const getAllTaskByProjectId = async (req, res) => {
    try {

        // Deny Permissions to User 
        // if (req.user.role !== "admin" && req.user.role !== "sub-admin") {
        //     return res.status(403).json({
        //         message: "Forbidden, only admin and sub-admin can access this resource",
        //         status: "error",
        //     })
        // }

        const { id } = req.params;
        // Fetch all task on project ID
        const tasks = await Task.find({ project: id })
            .populate("assignedTo", "name email")
            .populate("assignedBy", "name email")

        if (!tasks) {
            return res.status(404).json({
                message: "No tasks found for this project",
                status: "error",
            })
        }

        // If everything is good send the response
        return res.status(200).json({
            message: "Tasks retrieved successfully",
            data: tasks
        })
    }
    catch (err) {
        return res.status(500).json({
            message: "Server Error",
            error: err.message
        })
    }
}

const createTaskByProjectId = async (req, res) => {
    try {

        if (req.user.role !== "admin" && req.user.role !== "sub-admin") {
            return res.status(403).json({
                message: "Forbidden, only admin and sub-admin can access this resource",
                status: "error",
            })
        }

        const { id } = req.params;
        const {
            title,
            description,
            dueDate,
            priority,
            assignedTo,
            status
        } = req.body

        const projectPresent = await Project.findById(id)
        if (!projectPresent) {
            return res.status(404).json({
                status: "error",
                message: "project not found, maybe Id is invalid",
            })
        }

        const userId = await User.findOne({ email: assignedTo })

        const newTask = await Task.create({
            title,
            description,
            dueDate,
            priority,
            status,
            project: projectPresent._id,
            assignedTo: userId._id,
            assignedBy: req.user.sub,
        })

        if (!newTask) {
            return res.status(400).json({
                message: "Failed to create task",
                status: "error",
            })
        }

        return req.status(200).json({
            message: "successfully created task",
            data: newTask
        })

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Internal Server Error",
            error: error.message
        })
    }
}


export {
    getAllTaskByProjectId,
    createTaskByProjectId
}