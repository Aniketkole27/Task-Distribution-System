import { CheckCheck, Folder, Rocket, XCircle } from 'lucide-react'
import React from 'react'
import { useSelector } from 'react-redux'

const ProjectData = () => {
    const projectData = useSelector((state) => state.projectData.data)
    const projectInfoObject = {
        total: projectData.length,
        completed: projectData.filter((project) => project.status === "completed").length,
        active: projectData.filter((project) => project.status === "active").length,
        failed: projectData.filter((project) => project.status === "failed").length,
    }

    return (
        <div className='grid gap-4 grid-cols-4'>
            <LabelData
                label={"Total"}
                icon={<Folder size={16} />}
                value={projectInfoObject.total}
                color="text-indigo-500"
                bgColor="bg-indigo-500/10"
            />
            <LabelData
                label={"Active"}
                icon={<Rocket size={16} />}
                value={projectInfoObject.active}
                color="text-amber-500"
                bgColor="bg-amber-500/10"
            />
            <LabelData
                label={"Done"}
                icon={<CheckCheck size={16} />}
                value={projectInfoObject.completed}
                color="text-emerald-500"
                bgColor="bg-emerald-500/10"
            />
            <LabelData
                label={"Failed"}
                icon={<XCircle size={16} />}
                value={projectInfoObject.failed}
                color="text-rose-500"
                bgColor="bg-rose-500/10"
            />
        </div>
    )
}

export default ProjectData

const LabelData = ({ label, value, icon, color, bgColor }) => {
    return (
        <div className="flex items-center gap-4 p-4 bg-card border border-border/50 rounded-xl shadow-sm transition-all hover:border-border group">
            <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${bgColor} ${color} transition-transform group-hover:scale-110`}>
                {icon}
            </div>
            <div className='flex flex-col'>
                <span className='text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60'>
                    {label}
                </span>
                <span className='text-xl font-extrabold tracking-tight text-foreground'>
                    {value}
                </span>
            </div>
        </div>
    )
}

