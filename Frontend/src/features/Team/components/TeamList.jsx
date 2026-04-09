import { useState } from 'react'
import PrintList from './DisplayMembers'
import { useSelector } from 'react-redux'

const TeamList = ({allMembers}) => {

    const searchTerm = useSelector(state => state.currentUser.userSearch);


    const filteredMembers = allMembers.filter(member =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='px-4 mt-4 pb-4 mx-4 border border-stone-200 rounded'>
            <div>
                <div className=''>
                    <h1 className='text-xs py-2.5 px-1 text-stone-500 capitalize'>Admin</h1>
                    {
                        filteredMembers?.map((member) => (
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
                        filteredMembers?.map((member) => (
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
                        filteredMembers?.map((member) => (
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

