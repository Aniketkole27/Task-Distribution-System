import { Task } from "../models/task.model.js"
import { User } from "../models/users.model.js"

const handleGetAllTaskByProjectId = async (req, res) => {
    try {
        if (!req.user.role.includes("admin") && !req.user.role.includes("sub-admin")) {
            return res.status(403).json({
                message: "Forbidden, only admin and sub-admin can access this resource",
                status: "error",
            })
        }

        const { id } = req.params
        const tasks = await Task.find({ project: id })
            .populate("assignedTo", "name email")
            .populate("assignedBy", "name email")

        if (!tasks) {
            return res.status(404).json({
                message: "No tasks found for this project",
                status: "error",
            })
        }

        return res.status(200).json({
            message: "Tasks retrieved successfully",
            status: "success",
            data: tasks,
        })


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal Server Error",
            status: "error",
        })
    }
}

const handleCreateTaskByProjectId = async (req, res) => {
    if (!req.user.role.includes("admin") && !req.user.role.includes("sub-admin")) {
        return res.status(403).json({
            message: "Forbidden, only admin and sub-admin can access this resource",
            status: "error",
        })
    }

    const { id } = req.params;
    const { title, description, assignedTo, dueDate, priority } = req.body

    const userId = await User.findOne({ email: assignedTo })

    try {
        const newTask = await Task.create({
            title,
            description,
            dueDate,
            priority,
            assignedTo: userId._id,
            assignedBy: req.user.sub,
            project: id,
        })

        if (!newTask) {
            return res.status(400).json({
                message: "Failed to create task",
                status: "error",
            })
        }

        return res.status(200).json({
            message: "Task created successfully",
            status: "success",
            data: newTask,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal Server Error...",
            status: false,
        })
    }
}

export {
    handleGetAllTaskByProjectId,
    handleCreateTaskByProjectId
}