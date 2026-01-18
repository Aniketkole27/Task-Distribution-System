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

                <h1>Edit Members</h1>
            </div>
        </div>
    )
}

export default EditMember