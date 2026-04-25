import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTodo } from '@app/todoSlice'
import { Calendar, Flag, X } from 'lucide-react'

const TodoForm = ({ setOpenAddTask }) => {
    const dispatch = useDispatch()
    const [task, setTask] = useState({
        title: '',
        priority: 'medium',
        dueDate: new Date().toISOString().split('T')[0]
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!task.title.trim()) return

        dispatch(addTodo({
            ...task,
            isCompleted: false
        }))
        setOpenAddTask(false)
    }

    return (
        <div
            className='fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4'
            onClick={() => setOpenAddTask(false)}
        >
            <div
                className='bg-background w-full max-w-md rounded-xl shadow-2xl border border-border overflow-hidden transform transition-all'
                onClick={(e) => e.stopPropagation()}
            >
                <div className='flex items-center justify-between p-5 border-b border-border bg-card'>
                    <h2 className='text-lg font-bold text-foreground'>Create New Todo</h2>
                    <button
                        onClick={() => setOpenAddTask(false)}
                        className='p-1.5 hover:bg-muted rounded-md transition-colors text-muted-foreground'
                    >
                        <X size={18} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className='p-6 space-y-5'>
                    <div className='space-y-1.5'>
                        <label htmlFor="title" className='text-xs font-bold uppercase tracking-wider text-muted-foreground'>Todo Title</label>
                        <input
                            id="title"
                            type="text"
                            required
                            value={task.title}
                            onChange={(e) => setTask({ ...task, title: e.target.value })}
                            placeholder='e.g., Update project documentation'
                            className='w-full px-4 py-2.5 rounded-lg border border-border bg-card focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground placeholder:text-muted-foreground text-sm'
                            autoFocus
                        />
                    </div>

                    <div className='grid grid-cols-2 gap-4'>
                        <div className='space-y-1.5'>
                            <label className='text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5'>
                                <Flag size={12} /> Priority
                            </label>
                            <div className='flex p-1 bg-muted rounded-lg gap-1 border border-border'>
                                {[
                                    { id: 'low', label: 'Low', activeClass: 'text-emerald-600 bg-background' },
                                    { id: 'medium', label: 'Med', activeClass: 'text-amber-600 bg-background' },
                                    { id: 'high', label: 'High', activeClass: 'text-red-600 bg-background' }
                                ].map((p) => (
                                    <button
                                        key={p.id}
                                        type="button"
                                        onClick={() => setTask({ ...task, priority: p.id })}
                                        className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${task.priority === p.id
                                            ? `${p.activeClass} shadow-sm  border-border`
                                            : 'text-muted-foreground hover:text-foreground'
                                            }`}
                                    >
                                        {p.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className='space-y-1.5'>
                            <label className='text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5'>
                                <Calendar size={12} /> Due Date
                            </label>
                            <input
                                type="date"
                                value={task.dueDate}
                                onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
                                className='w-full px-3 py-2.5 rounded-lg border border-border bg-card focus:border-primary outline-none text-foreground text-sm'
                            />
                        </div>
                    </div>

                    <div className='pt-4'>
                        <button
                            type="submit"
                            className='w-full bg-foreground hover:bg-foreground/90 text-background font-bold py-3 rounded-lg shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm'
                        >
                            Add Todo
                        </button>
                        <button
                            type="button"
                            onClick={() => setOpenAddTask(false)}
                            className='w-full mt-2 text-muted-foreground hover:text-foreground text-xs font-medium py-2 transition-colors'
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default TodoForm

