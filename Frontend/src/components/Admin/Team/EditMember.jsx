import { useState } from "react"

const EditMember = ({ setOpen }) => {
    return (
        <div
            className='fixed inset-0 bg-stone-950/50 border z-50 flex items-start justify-center'
            onClick={() => setOpen(false)}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className='bg-white w-full max-w-2xl mx-auto mt-10 min-h-[80vh] rounded'
            >
                <div>
                    <h1 className="heading text-3xl text-center py-5">Create New Member</h1>
                    <div className="border-b border-stone-300"></div>
                    <div className="flex flex-col gap-5">

                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditMember

const InputField = ({
    label,
    as: Component = "input",
    className = "",
    placeholder,
    ...props

}) => {
    return (
        <div className="m-4 space-y-1.5">
            <label className="block text-xs p-0.5">{label}</label>
            <Component
                type={Component === 'input' ? type : undefined}
                className={`px-3 py-2 text-sm outline-none border w-120 text-black font-medium border-stone-300 rounded shadow ${className}`}
                placeholder={placeholder}
                {...props}
            >

            </Component>
        </div>
    )
}