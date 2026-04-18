import { useState } from "react";
import { useDispatch } from "react-redux";
import { CheckCircle, Edit, Save, Trash2, Calendar } from 'lucide-react'
import { handleComplete, handleDelete, handleEdit, triggerRefetch } from '@app/todoSlice';

const TodoItem = ({ task }) => {
    const dispatch = useDispatch();
    const [editedTitle, setEditedTitle] = useState("")
    const [isEditing, setIsEditing] = useState(false)

    const EditTodos = (id) => {
        if (isEditing) {
            dispatch(handleEdit({ id, title: editedTitle }));
            dispatch(triggerRefetch());
            setIsEditing(false);
            setEditedTitle("");
        } else {
            setIsEditing(true);
            setEditedTitle(task.title);
        }
    }

    const priorityColors = {
        high: "bg-red-500 shadow-sm shadow-red-200",
        medium: "bg-amber-400 shadow-sm shadow-amber-200",
        low: "bg-emerald-400 shadow-sm shadow-emerald-200"
    }

    return (
        <div key={task.id} className={`group flex justify-between items-center bg-background border border-border px-4 py-3 rounded-xl transition-all border-stone-400 hover:shadow-md ${task.isCompleted ? "opacity-60 grayscale-[0.5]" : ""}`}>
            <div className='flex gap-4 items-center flex-1'>
                <div className={`w-2.5 h-2.5 rounded-full ${priorityColors[task.priority] || priorityColors.medium}`}></div>
                <div className='flex-1'>
                    {isEditing ? (
                        <input
                            type="text"
                            value={editedTitle}
                            onChange={(e) => setEditedTitle(e.target.value)}
                            className='font-semibold text-foreground border-b-2 border-stone-900 w-full outline-none bg-transparent py-0.5'
                            autoFocus
                        />
                    ) : (
                        <h2 className={`font-semibold text-foreground transition-all ${task.isCompleted ? "line-through text-muted-foreground" : ""}`}>
                            {task.title}
                        </h2>
                    )}
                    <div className='flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground mt-1'>
                        <Calendar size={10} />
                        <span>Due: {task.dueDate}</span>
                    </div>
                </div>
            </div>

            <div className='flex items-center gap-1 ml-4 opacity-0 group-hover:opacity-100 transition-opacity'>
                <button
                    onClick={() => {
                        dispatch(handleComplete(task))
                        dispatch(triggerRefetch())
                    }}
                    title={task.isCompleted ? "Mark incomplete" : "Mark complete"}
                    className={`p-2 rounded-lg transition-colors ${task.isCompleted ? "text-emerald-600 bg-emerald-50" : "text-muted-foreground hover:text-emerald-600 hover:bg-emerald-50"}`}>
                    <CheckCircle size={18} />
                </button>
                <button
                    onClick={() => EditTodos(task._id)}
                    disabled={task.isCompleted}
                    title="Edit todo"
                    className={`p-2 rounded-lg transition-colors ${isEditing ? "text-blue-600 bg-blue-50" : "text-muted-foreground hover:text-blue-600 hover:bg-blue-50"} ${task.isCompleted ? "hidden" : ""}`}>
                    {isEditing ? <Save size={18} /> : <Edit size={18} />}
                </button>
                <button
                    onClick={() => {
                        dispatch(handleDelete(task._id))
                        dispatch(triggerRefetch())
                    }}
                    title="Delete todo"
                    className='p-2 rounded-lg text-muted-foreground hover:text-red-600 hover:bg-red-50 transition-colors'>
                    <Trash2 size={18} />
                </button>
            </div>
        </div>
    )
}

export default TodoItem
