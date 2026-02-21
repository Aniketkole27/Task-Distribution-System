import { CheckCheck, Folder, Hourglass, RocketIcon, XIcon } from 'lucide-react'
import React from 'react'
import { useSelector } from 'react-redux'

const ProjectData = () => {

    const projectData = useSelector((state) => state.projectData.projectData)
    const projectInfoObject = {
        total: projectData.length,
        completed: projectData.filter((project) => project.status === "completed").length,
        active: projectData.filter((project) => project.status === "in-progress").length,
        failed: projectData.filter((project) => project.status === "failed").length,
    }

    return (
        <div className='px-4 grid gap-3 grid-cols-4 mb-4'>
            <LabelData label={"Total Projects"} icon={<Folder size={16} />} value={projectInfoObject.total} />
            <LabelData color="bg-yellow-50" label={"Active Projects"} icon={<RocketIcon size={16} />} value={projectInfoObject.active} />
            <LabelData color="bg-green-100" label={"Completed Projects"} icon={<CheckCheck size={16} />} value={projectInfoObject.completed} />
            <LabelData color="bg-red-100" label={"Failed Projects"} icon={<XIcon size={16} />} value={projectInfoObject.failed} />
        </div>
    )
}

export default ProjectData


const LabelData = ({ label, value, icon, color = "bg-white" }) => {
    return (
        <div className='p-4 border rounded border-stone-300 shadow'>
            <div className='flex mb-3 gap-2 items-start '>
                <div className='grid gap-2'>
                    <span className={`text-xs font-medium px-2 py-1 rounded ${color}`}>
                        {icon}
                    </span>
                    <p className='text-2xl font-semibold'>{value}</p>
                </div>
                <h3 className='text-stone-500 mb-2 text-sm'>{label}</h3>
            </div>
        </div>
    )
}