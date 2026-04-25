import React, { useState, useEffect } from 'react'

const CreateTask = ({ setOpenTask }) => {

    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [])


    const [formData, setFormData] = useState({
        name: "",
        description: "",
        date: "",
        priority: "",
        assignedTo: ""
    })

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
                        placeholder={"Write project name"}
                        name="name"
                        value={formData.name}
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
                        placeholder={"Write project name"}
                        type='date'
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                    />
                    <InputField label={"Priority"} name="priority" as="select" defaultValue="" onChange={handleChange}>
                        <option value="" disabled>
                            Select Priority
                        </option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>

                    </InputField>

                    <InputField
                        label={"Assigned To"}
                        placeholder={"assigned to"}
                        type='type'
                        name="assignedTo"
                        value={formData.assignedTo}
                        onChange={handleChange}
                    />

                    <div className="p-4 border-t flex justify-center gap-2">
                        <button
                            onClick={() => setOpenTask(false)}
                            className="px-4 py-2 text-sm border rounded"
                        >
                            Cancel
                        </button>
                        <button onClick={() => {
                            setOpenTask(false)
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