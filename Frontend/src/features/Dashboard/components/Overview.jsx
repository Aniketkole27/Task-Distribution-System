import { all } from 'axios'
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Overview = () => {
    const navigate = useNavigate()
    const allProjects = useSelector(state => state.projectData.data);
    // console.log("projects in overview = ", allProjects)
    // console.log("Loading in overview = ", loading)

    return (
        <div className='p-4 mx-4  border border-border rounded h-fit'>
            <div className='flex items-center justify-between mb-8'>
                <h2 className='font-bold'>Project Overview</h2>
                <button
                    onClick={() => navigate("/admin/projects")}
                    className='text-xs bg-muted rounded px-2 py-1 cursor-pointer hover:bg-stone-300 active:bg-stone-400'>
                    view all
                </button>
            </div>

            {
                false
                    ? Array(5).fill(0).map((_, index) => (
                        <ProjectCardSkeleton key={index} />
                    ))
                    :
                    allProjects.slice(0, 5)?.map((project) => (
                        <ProjectCard
                            key={project._id}
                            name={project.name}
                            status={project.status}
                            dueDate={project.dueDate}
                        />
                    ))
            }
            {
                allProjects.length === 0 && !true && (
                    <h2 className='text-center text-sm font-medium text-gray-500'>No projects found</h2>
                )
            }
        </div >
    )
}

export default Overview


const ProjectCard = ({ name, status, dueDate }) => {
    return (
        <div className='p-4 border border-border rounded flex items-center justify-between my-3 hover:bg-muted cursor-pointer'>
            <h2 className='text-sm font-medium'>{name}</h2>
            <p className='text-xs flex items-center gap-1 font-medium px-2 py-1 rounded bg-yellow-100 text-foreground'>{status}</p>
        </div>
    )
}

const ProjectCardSkeleton = () => {
    // console.log("Inside skeleton")
    return (
        <div className='p-4 border-2 border-border rounded flex items-center justify-between my-3 animate-pulse'>
            <div className='h-4 w-32 bg-stone-300 rounded'></div>
            <div className='h-4 w-16 bg-stone-300 rounded'></div>
        </div>
    )
}