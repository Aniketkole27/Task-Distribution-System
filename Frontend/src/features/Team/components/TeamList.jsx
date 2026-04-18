import { useState } from 'react'
import PrintList from './DisplayMembers'
import { useSelector } from 'react-redux'

const TeamList = ({ allMembers }) => {

    const searchTerm = useSelector(state => state.currentUser.userSearch);


    const filteredMembers = allMembers.filter(member =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='px-4 mt-4 pb-4 mx-4 rounded'>
            <div>
                <div className=''>
                    <h1 className='text-xs py-2.5 px-1 text-muted-foreground capitalize'>Admin</h1>
                    {
                        filteredMembers?.map((member) => (
                            member.role === "admin" ?
                                <PrintList
                                    key={member._id}
                                    id={member._id}
                                    name={member.name}
                                    email={member.email}
                                    active={member.isActive}
                                /> : ""
                        ))

                    }

                    <h1 className='text-xs py-2.5 px-1 text-muted-foreground capitalize'>Sub-Admin</h1>
                    {
                        filteredMembers?.map((member) => (
                            member.role === "sub-admin" ?
                                <PrintList
                                    key={member._id}
                                    id={member._id}
                                    name={member.name}
                                    email={member.email}
                                    active={member.isActive}
                                /> : ""
                        ))
                    }

                    <h1 className='text-xs py-2.5 px-1 text-muted-foreground capitalize'>Users</h1>
                    {
                        filteredMembers?.map((member) => (
                            member.role === "user" ?
                                <PrintList
                                    key={member._id}
                                    id={member._id}
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

