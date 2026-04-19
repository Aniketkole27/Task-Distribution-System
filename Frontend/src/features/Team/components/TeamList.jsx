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
        <div className='p-6 mx-4 bg-card border border-border rounded-xl shadow-sm'>
            <div className='space-y-8'>
                {/* Admin Section */}
                <div>
                    <h2 className='text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4 flex items-center gap-2'>
                        <div className='w-1 h-1 bg-primary rounded-full' />
                        Administrators
                    </h2>
                    <div className='space-y-1'>
                        {filteredMembers?.map((member) => (
                            member.role === "admin" &&
                            <PrintList
                                key={member._id}
                                id={member._id}
                                name={member.name}
                                email={member.email}
                                active={member.isActive}
                            />
                        ))}
                    </div>
                </div>

                {/* Sub-Admin Section */}
                <div>
                    <h2 className='text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4 flex items-center gap-2'>
                        <div className='w-1 h-1 bg-amber-500 rounded-full' />
                        Management
                    </h2>
                    <div className='space-y-1'>
                        {filteredMembers?.map((member) => (
                            member.role === "sub-admin" &&
                            <PrintList
                                key={member._id}
                                id={member._id}
                                name={member.name}
                                email={member.email}
                                active={member.isActive}
                            />
                        ))}
                    </div>
                </div>

                {/* Users Section */}
                <div>
                    <h2 className='text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4 flex items-center gap-2'>
                        <div className='w-1 h-1 bg-muted-foreground rounded-full' />
                        Team Members
                    </h2>
                    <div className='space-y-1'>
                        {filteredMembers?.map((member) => (
                            member.role === "user" &&
                            <PrintList
                                key={member._id}
                                id={member._id}
                                name={member.name}
                                email={member.email}
                                active={member.isActive}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}


export default TeamList

