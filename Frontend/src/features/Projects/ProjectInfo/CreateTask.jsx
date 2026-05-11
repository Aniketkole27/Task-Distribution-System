import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import API from '../../../api/axiosInstance'

const CreateTask = ({ setOpenTask, selectedProjectDetails }) => {

    const allUsers = useSelector(state => state.currentUser.allUsers)

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
        priority: "",
        assignedTo: "",
        status: "todo"
    })

    const handleSubmitForm = async (data) => {
        if (!selectedProjectDetails?._id) {
            console.error('Project ID is missing');
            return;
        }
        try {
            const response = await API.post(`/api/task/create/${selectedProjectDetails._id}`, data)
            console.log('Task created successfully:', response.data);
            setOpenTask(false); // Close modal on success
        } catch (error) {
            console.error('Error creating task:', error);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    return (
        <div
            className='fixed inset-0 bg-background/80 border z-50 flex items-start justify-center'
            onClick={() => setOpenTask(false)}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className=' bg-background dark:bg-card rounded-lg shadow-xl border-border dark:border-border w-full max-w-2xl mx-auto mt-5 flex flex-col'
            >
                <div className="p-4 border-b text-center text-shadow-2xs border-border dark:border-border text-lg font-semibold">
                    Create New Task
                </div>

                <div className='flex-1 overflow-y-auto max-h-[80vh] px-6 pb-4 mx-auto'>
                    <InputField
                        label={"Task Title"}
                        placeholder={"Write project title"}
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                    <InputField
                        label={"Description"}
                        placeholder={"Write description"}
                        as='textarea'
                        row={4}
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                    <InputField
                        label={"Due Date"}
                        placeholder={"Write project title"}
                        type='date'
                        name="dueDate"
                        value={formData.dueDate}
                        onChange={handleChange}
                    />
                    <InputField label={"Priority"} name="priority" as="select" value={formData.priority} onChange={handleChange}>
                        <option value="" disabled>
                            Select Priority
                        </option>
                        <option value="urgent">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>

                    </InputField>

                    <InputField label={"Assigned To"} name="assignedTo" as="select" value={formData.assignedTo} onChange={handleChange}>
                        <option value="" disabled>
                            Select Member to Assign
                        </option>

                        {
                            // Map through team members and create options
                            allUsers.map((user) => (
                                <option key={user._id} value={user.name}>
                                    {user.name}
                                </option>
                            ))
                        }

                    </InputField>

                    <div className="p-4 border-t flex justify-center gap-2">
                        <button
                            onClick={() => setOpenTask(false)}
                            className="px-4 py-2 text-sm border rounded"
                        >
                            Cancel
                        </button>
                        <button onClick={() => {
                            // setOpenTask(false)
                            handleSubmitForm(formData)
                            console.log(formData)
                        }}
                            className="px-4 py-2 text-sm bg-black text-white rounded">
                            Create
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CreateTask


const InputField = ({
    label,
    type = "text",
    as: Component = "input",
    placeholder,
    className = "",
    value,
    onChange,
    ...props
}) => {
    return (
        <div className='m-4 space-y-1.5'>
            <label className='block text-xs p-0.5'>{label}</label>
            <Component
                required
                value={value}
                onChange={onChange}
                type={Component === 'input' ? type : undefined}
                placeholder={placeholder}
                className={`px-3 py-2 text-sm outline-none border w-120 text-foreground dark:text-foreground font-medium border-border dark:border-border rounded shadow ${className}`}
                {...props}
            />
            {/* <input type="text" o /> */}
        </div>
    )
}