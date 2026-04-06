import { Todo } from '../models/todo.model.js'

const handleGetAllTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ user: req.user.sub }).sort({ createdAt: -1 }).populate("user", "name email");
        if (!todos && todos.length === 0) {
            return res.status(403).json({ message: "No todos available", success: false });
        }
        return res.status(200).json({ success: true, todos: todos })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Fail to fetch todos", success: false });
    }
}

const handleAddTodo = async (req, res) => {
    try {
        const { title, priority, dueDate, isCompleted } = req.body;
        const newTodo = await Todo.create({
            user: req.user.sub,
            title,
            priority,
            dueDate,
            isCompleted
        })
        if (!newTodo) {
            return res.status(403).json({
                message: "Fail to Add todo",
                success: false
            });
        }

        return res.status(200).json({
            message: "Todo added successfully",
            success: true, todo: newTodo
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Fail to Add todo1",
            success: false
        });
    }
}

const handleUpdateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, priority, dueDate, isCompleted } = req.body;
        const updatedTodo = await Todo.findByIdAndUpdate(id, {
            title,
            priority,
            dueDate,
            isCompleted
        }, { new: true })

        if (!updatedTodo) {
            return res.status(404).json({
                message: "todo not found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Todo updated successfully",
            success: true,
            todo: updatedTodo
        })

    } catch (error) {
        return res.status(500).json({
            message: "Fail to update todo",
            success: false
        });
    }
}

const handleDeleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTodo = await Todo.findByIdAndDelete(id)

        if (!deletedTodo) {
            return res.status(404).json({
                message: "Todo not found",
                status: false
            });
        }
        return res.status(200).json({
            message: "Todo Deleted successfully",
            status: true,
        })

    } catch (error) {
        return res.status(500).json({
            message: "Fail to delete todo",
            status: false
        });
    }
}

export {
    handleGetAllTodos,
    handleAddTodo,
    handleUpdateTodo,
    handleDeleteTodo
}
