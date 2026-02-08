import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setProjectInfo } from '../app/currentTabSlice';

const TotalProjects = ({ projectList }) => {

    const searchResult = useSelector((state) => state.project.projectSearch)
    const selectedFilter = useSelector(state => state.project.selected);
    const dispatch = useDispatch();

    const filteredResult = projectList.filter((project) =>
        (!searchResult || project.name.toLowerCase().includes(searchResult.toLowerCase())) &&
        (selectedFilter === "all" || project.status.toLowerCase().includes(selectedFilter.toLowerCase()))
    )

    return (
        <div className='border rounded border-stone-300 p-4 mx-4 mt-6'>
            <h2 className='mb-8 test-sm font-bold'>All Projects</h2>
            {
                filteredResult.map((project) => (
                    <ProjectDiv
                        title={project.name}
                        dueDate={project.dueDate}
                        status={project.status}
                    />
                ))
            }
            {
                filteredResult.length === 0 && <h1 className='text-xl font-semibold'>Project Not Found !</h1>
            }
        </div>
    )
}

export default TotalProjects


const ProjectDiv = ({ title, dueDate, status, className = "" }) => {
    const [color, setColor] = useState("")
    useEffect(() => {
        if (status === "in-progress") setColor("bg-yellow-100")
        else if (status === "failed") setColor("bg-red-100")
        else setColor("bg-green-200")
    }, [status])

    return (
        <div
            className='px-4 py-4 mb-4 border flex items-center justify-between rounded shadow hover:bg-stone-200 cursor-pointer border-stone-300'>
            <div className='space-y-1'>
                <p className='text-sm text-black font-semibold'>{title}</p>
                <p className='text-xs text-stone-500 font-medium '>Due date: {dueDate}</p>
            </div>
            <p className={`${color} text-xs text-shadow-2xs border py-1 border-stone-300 text-center w-17 rounded`}>{status}</p>
        </div>
    )
}