import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setProjectInfo } from '../app/currentTabSlice';

const TotalProjects = ({ setProjectDetails, setClickedProject }) => {

    const projectData = useSelector((state) => state.projectData.projectData)
    const searchResult = useSelector((state) => state.projectData.projectSearch)
    const selectedFilter = useSelector(state => state.projectData.selected);

    const filteredResult = projectData.filter((project) =>
        (!searchResult || project.name.toLowerCase().includes(searchResult.toLowerCase())) &&
        (selectedFilter === "all" || project.status.toLowerCase().includes(selectedFilter.toLowerCase()))
    )

    return (
        <div className='border rounded border-stone-300 p-4 mx-4 mt-6'>
            <h2 className='mb-8 test-sm font-bold'>All Projects</h2>
            {
                filteredResult.map((project) => (
                    <ProjectDiv
                        id={project.id}
                        title={project.name}
                        dueDate={project.dueDate}
                        status={project.status}
                        setProjectDetails={setProjectDetails}
                        setClickedProject={setClickedProject}
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


const ProjectDiv = ({ id, title, dueDate, status, className = "", setProjectDetails, setClickedProject }) => {
    const [color, setColor] = useState("")
    useEffect(() => {
        if (status === "in-progress") setColor("bg-yellow-100")
        else if (status === "failed") setColor("bg-red-100")
        else setColor("bg-green-200")
    }, [status])

    return (
        <div
            key={id}
            onClick={() => {
                setProjectDetails(true)
                setClickedProject(id)
            }}
            className='px-4 py-4 mb-4 border flex items-center justify-between rounded shadow hover:bg-stone-200 cursor-pointer border-stone-300'>
            <div className='space-y-1'>
                <p className='text-sm text-black font-semibold'>{title}</p>
                <p className='text-xs text-stone-500 font-medium '>Due date: {dueDate}</p>
            </div>
            <p className={`${color} text-xs text-shadow-2xs border py-1 border-stone-300 text-center w-17 rounded`}>{status}</p>
        </div>
    )
}