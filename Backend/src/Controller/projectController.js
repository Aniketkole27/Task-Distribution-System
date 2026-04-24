import { Project } from "../models/project.model.js";
import { User } from "../models/users.model.js"
import { Task } from "../models/task.model.js"

const handleGetAllProjects = async (req, res) => {
    try {

        if (req.user.role !== "admin" && req.user.role !== "sub-admin") {
            return res.status(403).json({
                message: "Only admin and sub-admin can view all projects",
            });
        }

        const projects = await Project.find({})
            .populate("teamMembers", "name email")
            .populate("createdBy", "name email");

        if (!projects) {
            return res.status(403).json({
                message: "Fail to get projects",
                success: false
            });
        }

        return res.status(200).json({
            message: "Projects retrieved successfully",
            success: true,
            projects
        })


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Fail to get projects",
            success: false
        })
    }
}

const handleCreateProject = async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({
                message: "Only admin can create project",
            });
        }
        const { name, description, priority, dueDate, teamMembers } = req.body;

        const members = await Promise.all(
            teamMembers.map(async (name) => {
                const user = await User.findOne({ name });

                if (!user) {
                    throw new Error(`User not found: ${name}`);
                }

                return user._id;
            })
        );

        const project = await Project.create({
            name,
            description,
            priority,
            dueDate,
            teamMembers: members,
            createdBy: req.user.sub,
            status: "active"
        })

        if (!project) {
            return res.status(403).json({
                message: "Fail to create project",
                status: false
            });
        }

        return res.status(200).json({
            message: "Project created successfully",
            success: true,
            project
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Fail to create project",
            success: false
        });
    }
}

const handleGetProjectById = async (req, res) => {
    try {

        if (res.user.role !== "admin") {
            return res.status(403).json({
                message: "Only admin can view project details",
                success: false
            })
        }

        const { id } = req.params;
        const project = await Project.findById(id)
            .populate("teamMembers", "name email")
            .populate("createdBy", "name email");

        if (!project) {
            return res.status(403).json({
                message: "Project not found",
                success: false
            })
        }

        return res.status(200).json({
            message: "Project retrieved successfully",
            success: true,
            project
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Fail to get project",
            success: false
        })
    }
}

const handleUpdateProjectById = async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({
                message: "Only admin can update project",
                success: false
            })
        }

        const { id } = req.params;
        const { name, description, priority, dueDate, teamMembers, status } = req.body;

        const updateData = {};

        // Only include fields if provided
        if (name) updateData.name = name;
        if (description) updateData.description = description;
        if (priority) updateData.priority = priority;
        if (dueDate) updateData.dueDate = dueDate;
        if (status) updateData.status = status;

        if (teamMembers && teamMembers.length > 0 && Array.isArray(teamMembers)) {
            const members = await Promise.all(
                teamMembers.map(async (email) => {
                    const user = await User.findOne({ email });
                    if (!user) {
                        throw new Error(`User not found: ${email}`);
                    }
                    return user._id;
                })
            );

            updateData.teamMembers = members;
        }

        const project = await Project.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        ).populate("teamMembers", "name email").populate("createdBy", "name email");


        if (!project) {
            return res.status(403).json({
                message: "Project not found",
                success: false
            })
        }

        return res.status(200).json({
            message: "Project updated successfully",
            success: true,
            project
        })


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Fail to update project",
            success: false
        })
    }
}

const handleDeleteProjectById = async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({
                message: "Only admin can delete project",
                success: false
            })
        }

        const { id } = req.params;
        const project = await Project.findByIdAndDelete(id);
        if (!project) {
            return res.status(403).json({
                message: "Project not found",
                success: false
            })
        }

        return res.status(200).json({
            message: "Project deleted successfully",
            success: true
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Fail to delete project",
            success: false
        })
    }
}


export {
    handleCreateProject,
    handleGetAllProjects,
    handleGetProjectById,
    handleUpdateProjectById,
    handleDeleteProjectById
}