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
    console.log(req.user)
    try {
        if (!req.user) {
            return res.status(401).json({
                message: "Unauthorized",
                status: "error",
            });
        }

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

        const userId = await User.findOne({ name: assignedTo })

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

        return res.status(200).json({
            message: "successfully created task",
            data: newTask
        })

    } catch (error) {
        // console.log(error)
        return res.status(500).json({
            status: "error",
            message: "Internal Server Error",
            error: error.message
        })
    }
}

const getAllTaskByUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({ _id: id })
        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "user not found, user Id is invalid",
            })
        }

        const task = await Task.find({ assignedTo: user._id })
            .populate("assignedBy", "name email")
            .populate("project", "name")
            .populate("assignedTo", "name email")

        if (task.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "No tasks found for this user",
            })
        }

        return res.status(200).json({
            message: "Tasks retrieved successfully",
            data: task
        })

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Internal Server Error",
            error: error.message
        })
    }
}

const updateTaskStatus = async (req, res) => {
    try {
        const { status, adminNote } = req.body
        const { id } = req.params;
        const userRole = req.user.role;
        const userId = req.user.sub;

        let query = { _id: id };

        // 1. Permission checks for Approve/Reject
        if (status === "rejected" || status === "approved") {
            if (userRole === "user") {
                return res.status(403).json({
                    message: "Forbidden: Only Admin and Sub-Admin can approve or reject tasks",
                    status: "error",
                })
            }

            if (userRole === "sub-admin") {
                // Sub-admin can only approve/reject tasks they assigned
                query.assignedBy = userId;
            }
            // Admin has no extra query restriction (can manage everything)
        } else {
            // 2. Ownership check for other status updates (e.g., moving to in-progress)
            if (userRole === "user") {
                // Regular users can only update tasks assigned to them
                query.assignedTo = userId;
            }
        }

        // Build update data — include adminNote for approve/reject actions
        const updateData = { status };
        if ((status === "approved" || status === "rejected") && adminNote !== undefined) {
            updateData.adminNote = adminNote;
            updateData.lastReviewedAt = Date.now();
        }

        const task = await Task.findOneAndUpdate(query, updateData, { new: true })
            .populate("assignedBy", "name email")
            .populate("project", "name")
            .populate("assignedTo", "name email");

        if (!task) {
            return res.status(404).json({
                status: "error",
                message: userRole === 'user'
                    ? "Task not found or you don't have permission to update this task"
                    : (userRole === 'sub-admin' && (status === "approved" || status === "rejected"))
                        ? "Task not found or you can only approve/reject tasks assigned by you"
                        : "Task not found, task Id is invalid",
            })
        }

        return res.status(200).json({
            message: "Task status updated successfully",
            status: "success",
            data: task
        })
    } catch (error) {
        console.error("Update Task Status Error:", error)
        return res.status(500).json({
            status: "error",
            message: "Internal Server Error",
            error: error.message
        })
    }
}

const handlemoveForReview = async (req, res) => {
    try {
        if (req.user.role !== "user") {
            return res.status(403).json({
                status: "error",
                message: "Only User can submit task"
            });
        }

        const { id } = req.params
        const { submitDescription } = req.body;

        const existingTask = await Task.findById(id)
        if (!existingTask) {
            return res.status(404).json({
                status: "error",
                message: "Task not found, task Id is invalid",
            })
        }

        const updatedTask = await Task.findOneAndUpdate(
            { _id: id },
            {
                status: "under-review",
                submissionNote: submitDescription,
                submitedAt: Date.now(),
            },
            { new: true }
        )
            .populate("assignedBy", "name email")
            .populate("project", "name")
            .populate("assignedTo", "name email");
        return res.status(200).json({
            message: "Task submitted successfully",
            status: "success",
            data: updatedTask
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
    createTaskByProjectId,
    getAllTaskByUserId,
    updateTaskStatus,
    handlemoveForReview
}