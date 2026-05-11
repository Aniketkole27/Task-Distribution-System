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
        <div className='grid gap-4 grid-cols-1 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
            <StatusCard
                totalMembers={totalMembers}
                totalProjects={totalProjects}
                totalActiveProjects={totalActiveProjects}
            />
        </div>
    )
}

export default Grid
