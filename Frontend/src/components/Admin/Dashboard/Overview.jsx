import React from 'react'

const Overview = () => {
    return (
        <div className='p-4 mx-4  border border-stone-300 rounded h-fit'>
            <div className='flex items-center justify-between mb-8'>
                <h2 className='font-bold'>Project Overview</h2>
                <button className='text-xs bg-stone-200 rounded px-2 py-1 cursor-pointer hover:bg-stone-300 active:bg-stone-400'>view all </button>
            </div>
            <ProjectCard title={"Online clipboard"} status={"pending"} dueDate={"15/1/2026"}/>
            <ProjectCard title={"AI based interview platform"} status={"pending"} dueDate={"15/1/2026"}/>
            <ProjectCard title={"Task Distribution system"} status={"pending"} dueDate={"15/1/2026"}/>
            <ProjectCard title={"Task Distribution system"} status={"pending"} dueDate={"15/1/2026"}/>
        </div>
    )
}

export default Overview


const ProjectCard = ({title, status, dueDate}) => {
    return (
        <div className='p-4 border border-stone-300 rounded flex items-center justify-between my-3 hover:bg-stone-200 cursor-pointer'>
            <h2 className='text-sm font-medium'>{title}</h2>
            <p className='text-xs flex items-center gap-1 font-medium px-2 py-1 rounded bg-yellow-100 text-black'>{status}</p>
        </div>
    )
}