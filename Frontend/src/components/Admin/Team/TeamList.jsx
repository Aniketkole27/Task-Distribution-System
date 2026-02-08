import { useState } from 'react'
import PrintList from './DisplayMembers'

const TeamList = () => {
    const teamMembers = [
        {
            id: "admin-001",
            name: "Smitaa Kasar",
            email: "smitaakasar@gmail.com",
            mobile: "9923345899",
            role: "admin",
            isActive: true
        },
        {
            id: "user-001",
            name: "Picky Blander",
            email: "pickyblander@gmail.com",
            mobile: "2334512310",
            role: "user",
            isActive: true
        },
        {
            id: "user-002",
            name: "Iron Man",
            email: "ironman@gmail.com",
            mobile: "9232298321",
            role: "sub-admin",
            isActive: true
        },
        {
            id: "user-003",
            name: "Hulk",
            email: "hulk@gmail.com",
            mobile: "2334512310",
            role: "user",
            isActive: true
        },
        {
            id: "user-004",
            name: "Walter White",
            email: "walterwhite@gmail.com",
            mobile: "2334512310",
            role: "user",
            isActive: true
        }
    ]

    return (
        <div className='px-4 mt-4 pb-4 mx-4 border border-stone-200 rounded'>
            <div>
                <div className=''>
                    <h1 className='text-xs py-2.5 px-1 text-stone-500 capitalize'>Admin</h1>
                    {
                        teamMembers.map((member) => (
                            member.role === "admin" ?
                                <PrintList
                                    key={member.id}
                                    id={member.id}
                                    name={member.name}
                                    email={member.email}
                                    active={member.isActive}
                                /> : ""
                        ))
                    }

                    <h1 className='text-xs py-2.5 px-1 text-stone-500 capitalize'>Sub-Admin</h1>
                    {
                        teamMembers.map((member) => (
                            member.role === "sub-admin" ?
                                <PrintList
                                    key={member.id}
                                    id={member.id}
                                    name={member.name}
                                    email={member.email}
                                    active={member.isActive}
                                /> : ""
                        ))
                    }

                    <h1 className='text-xs py-2.5 px-1 text-stone-500 capitalize'>Users</h1>
                    {
                        teamMembers.map((member) => (
                            member.role === "user" ?
                                <PrintList
                                    key={member.id}
                                    id={member.id}
                                    name={member.name}
                                    email={member.email}
                                    active={member.isActive}
                                /> : ""
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default TeamList

