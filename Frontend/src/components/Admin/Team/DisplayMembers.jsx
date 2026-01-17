import { MoreHorizontal } from 'lucide-react'
import { useState } from 'react'
import EditMember from './EditMember'

const DisplayMembers = ({ role }) => {
    const teamMembers = [
        {
            name: "Smitaa Kasar",
            email: "smitaakasar@gmail.com",
            mobile: "9923345899",
            role: "admin",
            isActive: true
        },
        {
            name: "Picky Blander",
            email: "pickyblander@gmail.com",
            mobile: "2334512310",
            role: "user",
            isActive: true
        },
        {
            name: "Iron Man",
            email: "ironman@gmail.com",
            mobile: "9232298321",
            role: "sub-admin",
            isActive: true
        },
        {
            name: "Hulk",
            email: "hulk@gmail.com",
            mobile: "2334512310",
            role: "user",
            isActive: true
        },
        {
            name: "Walter White",
            email: "walterwhite@gmail.com",
            mobile: "2334512310",
            role: "user",
            isActive: true
        }
    ]
    // const [data, setData] = useState(teamMembers)
    return (
        <div>
            <div className=''>
                <h1 className='text-xs py-2.5 px-1 text-stone-500 capitalize'>{role}</h1>
                {
                    teamMembers.map((member) => (
                        member.role === role ?
                            <PrintList
                                name={member.name}
                                email={member.email}
                                active={member.isActive}
                            /> : ""
                    ))
                }
            </div>
        </div>
    )
}

export default DisplayMembers



const PrintList = ({ name, email, teamMembers }) => {
    const [open, setOpen] = useState(false)
    return (
        <>
            <div className='px-4 py-2 mb-1 border flex items-center justify-between rounded border-stone-300'>
                <div className='space-y-1'>
                    <p className='text-sm text-black font-semibold'>
                        {name}</p>
                    <p className='text-xs text-stone-500'>{email}</p>
                </div>

                <p className='text-xs capitalize font-medium cursor-pointer hover:bg-stone-200 active:bg-stone-300 p-1.5 rounded-full'>
                    <MoreHorizontal size={14} onClick={() => setOpen(true)} />
                </p>
            </div>
            {open ? <EditMember open={open} setOpen={setOpen} email={email} teamMembers={teamMembers} /> : null}
        </>
    )
}