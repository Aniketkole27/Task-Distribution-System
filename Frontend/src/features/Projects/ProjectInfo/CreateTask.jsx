import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { X, Layout, AlignLeft, Calendar, Zap, UserPlus } from 'lucide-react'
import { addTaskInProjectWithId } from '@/app/projectTaskSlice'

const CreateTask = ({ setOpenTask, selectedProjectDetails }) => {
    const allUsers = useSelector(state => state.currentUser.allUsers)
    const dispatch = useDispatch()

    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [])

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        dueDate: "",
        priority: "medium",
        assignedTo: "",
        status: "todo"
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = () => {
        if (!formData.title || !formData.description || !formData.dueDate || !formData.priority || !formData.assignedTo) return;
        setOpenTask(false)
        dispatch(addTaskInProjectWithId({
            projectId: selectedProjectDetails._id,
            taskData: formData
        }))
    }

    return (
        <div
            className='fixed inset-0 bg-background/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all'
            onClick={() => setOpenTask(false)}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className='bg-card border border-border shadow-2xl rounded-2xl w-full max-w-lg flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200'
            >
                {/* Header */}
                <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-muted/30">
                    <h2 className="text-lg font-bold flex items-center gap-2">
                        <Layout size={20} className="text-blue-500" />
                        Create New Task
                    </h2>
                    <button
                        onClick={() => setOpenTask(false)}
                        className='p-1.5 hover:bg-muted rounded-full transition-colors text-muted-foreground hover:text-foreground'
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Form Content */}
                <div className='p-6 space-y-5 overflow-y-auto max-h-[75vh]'>
                    <div className='space-y-1.5'>
                        <label className='flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70 px-1'>
                            <AlignLeft size={14} className="text-blue-500" />
                            Task Title
                        </label>
                        <input
                            required
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="What needs to be done?"
                            className='w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all placeholder:text-muted-foreground/40'
                        />
                    </div>

                    <div className='space-y-1.5'>
                        <label className='flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70 px-1'>
                            <AlignLeft size={14} className="text-blue-500" />
                            Description
                        </label>
                        <textarea
                            required
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Add some details..."
                            rows={3}
                            className='w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all resize-none placeholder:text-muted-foreground/40'
                        />
                    </div>

                    <div className='grid grid-cols-2 gap-4'>
                        <div className='space-y-1.5'>
                            <label className='flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70 px-1'>
                                <Calendar size={14} className="text-blue-500" />
                                Due Date
                            </label>
                            <input
                                required
                                type="date"
                                name="dueDate"
                                value={formData.dueDate}
                                onChange={handleChange}
                                className='w-full px-4 py-2 bg-background border border-border rounded-xl text-sm focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all cursor-pointer'
                            />
                        </div>

                        <div className='space-y-1.5'>
                            <label className='flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70 px-1'>
                                <Zap size={14} className="text-blue-500" />
                                Priority
                            </label>
                            <select
                                required
                                name="priority"
                                value={formData.priority}
                                onChange={handleChange}
                                className='w-full px-4 py-2 bg-background border border-border rounded-xl text-sm focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all cursor-pointer appearance-none'
                            >
                                <option value="urgent">Urgent</option>
                                <option value="medium">Medium</option>
                                <option value="low">Low</option>
                            </select>
                        </div>
                    </div>

                    <div className='space-y-1.5'>
                        <label className='flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70 px-1'>
                            <UserPlus size={14} className="text-blue-500" />
                            Assign To
                        </label>
                        <select
                            required
                            name="assignedTo"
                            value={formData.assignedTo}
                            onChange={handleChange}
                            className='w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all cursor-pointer'
                        >
                            <option value="" disabled>Select Team Member</option>
                            {allUsers.map((user) => (
                                <option key={user._id} value={user.name}>
                                    {user.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-border bg-muted/30 flex items-center justify-end gap-3">
                    <button
                        onClick={() => setOpenTask(false)}
                        className="px-5 py-2 text-sm font-semibold hover:bg-muted rounded-xl transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={!formData.title || !formData.description || !formData.dueDate || !formData.priority || !formData.assignedTo}
                        className="px-6 py-2 text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-500/20 transition-all disabled:opacity-50 disabled:shadow-none"
                    >
                        Create Task
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CreateTask
