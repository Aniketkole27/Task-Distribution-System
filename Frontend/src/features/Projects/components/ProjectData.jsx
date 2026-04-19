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
        <div className='px-4 grid gap-3 grid-cols-4 mb-4'>
            <LabelData
                label={"Total Projects"}
                icon={<Folder size={20} />}
                value={projectInfoObject.total}
                color="text-indigo-600"
                bgColor="bg-indigo-50"
                borderColor="border-indigo-100"
            />
            <LabelData
                label={"Active Projects"}
                icon={<Rocket size={20} />}
                value={projectInfoObject.active}
                color="text-amber-600"
                bgColor="bg-amber-50"
                borderColor="border-amber-100"
            />
            <LabelData
                label={"Completed"}
                icon={<CheckCheck size={20} />}
                value={projectInfoObject.completed}
                color="text-emerald-600"
                bgColor="bg-emerald-50"
                borderColor="border-emerald-100"
            />
            <LabelData
                label={"Failed"}
                icon={<XCircle size={20} />}
                value={projectInfoObject.failed}
                color="text-red-600"
                bgColor="bg-red-50"
                borderColor="border-red-100"
            />
        </div>
    )
}

export default ProjectData

const LabelData = ({ label, value, icon, color, bgColor, borderColor }) => {
    return (
        <div className={`p-6 bg-card border ${borderColor} rounded-2xl shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 group overflow-hidden relative`}>
            <div className='flex items-start justify-between relative z-10'>
                <div className='space-y-4'>
                    <div className={`p-3 rounded-xl ${bgColor} ${color} w-fit shadow-inner`}>
                        {icon}
                    </div>
                    <div>
                        <h3 className='text-muted-foreground font-medium text-[10px] uppercase tracking-widest mb-1'>{label}</h3>
                        <p className='text-3xl font-bold tracking-tight text-foreground'>{value}</p>
                    </div>
                </div>
            </div>
            
            {/* Soft decorative background shape */}
            <div className={`absolute -right-4 -bottom-4 w-24 h-24 rounded-full ${bgColor} opacity-20 blur-2xl group-hover:opacity-30 transition-opacity`} />
        </div>
    )
}