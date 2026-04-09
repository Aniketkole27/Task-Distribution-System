import React from 'react'
import StatusCard from './StatusCard'
import { useSelector } from 'react-redux';

const Grid = () => {
    const allUsers = useSelector(state => state.currentUser.allUsers);
    const allProjects = useSelector(state => state.projectData.data);

    const totalActiveProjects = allProjects.filter(project => project.status === "active").length

    const totalProjects = allProjects.length;
    const totalMembers = allUsers.length;

    return (
        <div className='px-4 grid gap-3 grid-cols-3 mb-4'>
            <StatusCard
                totalMembers={totalMembers}
                totalProjects={totalProjects}
                totalActiveProjects={totalActiveProjects}
            />
        </div>
    )
}

export default Grid
