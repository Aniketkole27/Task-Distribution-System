import { useState } from "react"

const EditMember = ({setOpen }) => {
    return (
        <div
            className='fixed inset-0 bg-stone-950/50 border z-50 flex items-start justify-center'
            onClick={() => setOpen(false)}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className='bg-white w-full max-w-2xl mx-auto mt-10 min-h-[80vh] rounded'
            >
<<<<<<< HEAD
                {/* {
=======
                {
>>>>>>> auth-feature
                    teamMember.map((member) => (
                        <div key={email}>
                            <h1>{member.name}</h1>
                            <h1>{member.email}</h1>
                            <h1>{member.mobile}</h1>
                            <h1>{member.isActive}</h1>
                        </div>
                    ))
<<<<<<< HEAD
                } */}
                <h1>Edit Members</h1>
=======
                }
>>>>>>> auth-feature
            </div>
        </div>
    )
}

export default EditMember