import { useState } from "react";
import { useDispatch } from "react-redux";
import { CheckCheck, CheckCircle, Edit, Save, Trash2 } from 'lucide-react'
import { handleComplete, handleDelete, handleEdit } from '@app/todoSlice';

const TodoFormate = ({ task }) => {
    const dispatch = useDispatch();
    const [editedTitle, setEditedTitle] = useState("")
    const [isEditing, setIsEditing] = useState(false)
    const EditTodos = (id) => {
        if (isEditing) {
            dispatch(handleEdit({ id, title: editedTitle }));
            setIsEditing(false);
            setEditedTitle("");
        } else {
            setIsEditing(true);
            setEditedTitle(task.title);
        }
    }
    return (
        <div key={task.id} className={`flex justify-between items-center my-1 border border-stone-300 px-3 py-2 rounded shadow ${task.isCompleted ? "bg-gray-300" : ""}`}>
            <div className='flex gap-5 items-center'>
                <span className={`border border-stone-500 rounded-full  ${task.priority === 'high' ? "bg-red-500" : "bg-amber-400"} w-3 h-3`}></span>
                {isEditing ? (
                    <input
                        type="text"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                        className='font-semibold border rounded px-3 py-0.5 w-170 outline-none'
                        autoFocus
                    />
                ) : (
                    <h2 className={`${task.isCompleted === true ? "line-through text-black" : "text-black"} font-semibold`}>{task.title}</h2>
                )}
            </div>

            <div className='flex gap-2'>
                <div className='flex items-center gap-10 mx-10'>
                    <h1 className={`text-sm `}>Due: {task.dueDate}</h1>
                </div>
                <button
                    onClick={() => dispatch(handleComplete(task.id))}
                    className='px-2 py-1 text-black text-sm rounded-full active:bg-green-300 cursor-pointer'>
                    <CheckCircle size={15} />
                </button>
                <button
                    onClick={() => EditTodos(task.id)}
                    disabled={task.isCompleted}
                    className={`px-2 py-1 text-blue-500 text-sm rounded-full active:bg-blue-300 cursor-pointer ${task.isCompleted ? "cursor-default opacity-50" : ""}`}>
                    {isEditing ? <Save size={15} /> : <Edit size={15} />}

                </button>
                <button
                    onClick={() => dispatch(handleDelete(task.id))}
                    className='px-2 py-1 text-red-500 text-sm rounded-full active:bg-red-300 cursor-pointer'>
                    <Trash2 size={15} />
                </button>
            </div>
        </div>
    )
}

export default TodoFormate