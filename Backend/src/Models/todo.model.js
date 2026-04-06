import mongoose, { Schema } from 'mongoose'

const TodoSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    priority: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "medium"
    },
    dueDate: {
        type: String,
    },
    isCompleted: {
        type: Boolean,
        required: false
    }
}, { timestamps: true })

export const Todo = mongoose.model("Todo", TodoSchema)

