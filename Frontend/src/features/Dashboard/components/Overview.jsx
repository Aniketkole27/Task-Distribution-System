import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Calendar, ChevronRight, Clock } from 'lucide-react'

const Overview = () => {
    const navigate = useNavigate()
    const allProjects = useSelector(state => state.projectData.data);

    return (
        <div className='p-6 mx-4 bg-card border border-border rounded-xl shadow-sm h-fit'>
            <div className='flex items-center justify-between mb-8'>
                <div className='space-y-1'>
                    <h2 className='text-lg font-bold tracking-tight'>Recent Projects</h2>
                    <p className='text-xs text-muted-foreground'>Overview of your current project landscape</p>
                </div>
                <button
                    onClick={() => navigate("/admin/projects")}
                    className='text-xs px-3 py-1.5 font-medium transition-all bg-secondary hover:bg-muted border border-border rounded-lg flex items-center gap-1 group'
                >
                    View All
                    <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
            </div>

            <div className='space-y-4'>
                {allProjects.length > 0 ? (
                    allProjects.slice(0, 5).map((project) => (
                        <ProjectCard
                            key={project._id}
                            id={project._id}
                            name={project.name}
                            status={project.status}
                            dueDate={project.dueDate}
                        />
                    ))
                ) : (
                    <div className='flex flex-col items-center justify-center py-12 text-center'>
                        <div className='w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-3'>
                            <Calendar size={20} className='text-muted-foreground' />
                        </div>
                        <h3 className='text-sm font-semibold'>No projects found</h3>
                        <p className='text-xs text-muted-foreground max-w-[200px] mt-1'>
                            You haven't started any projects yet. Create one to get started.
                        </p>
                    </div>
                )}
            </div>
        </div >
    )
}

export default Overview

const ProjectCard = ({ id, name, status, dueDate }) => {
    const navigate = useNavigate()

    const statusConfig = {
        active: { color: 'text-blue-600 bg-blue-50 border-blue-100', icon: <Clock size={12} /> },
        completed: { color: 'text-green-600 bg-green-50 border-green-100', icon: <Clock size={12} /> },
        failed: { color: 'text-red-600 bg-red-50 border-red-100', icon: <Clock size={12} /> },
        pending: { color: 'text-amber-600 bg-amber-50 border-amber-100', icon: <Clock size={12} /> }
    }

    const config = statusConfig[status.toLowerCase()] || statusConfig.pending

    return (
        <div
            onClick={() => navigate(`/admin/projects/${id}`)}
            className='group p-4 border border-border rounded-xl flex items-center justify-between transition-all hover:shadow-md hover:border-primary/20 hover:bg-muted/30 cursor-pointer animate-in fade-in slide-in-from-bottom-2 duration-300'
        >
            <div className='space-y-1'>
                <h3 className='text-sm font-semibold group-hover:text-primary transition-colors'>{name}</h3>
                <div className='flex items-center gap-3 text-[10px] text-muted-foreground'>
                    <span className='flex items-center gap-1'>
                        <Calendar size={12} strokeWidth={2.5} />
                        Due {dueDate}
                    </span>
                </div>
            </div>

            <div className='flex items-center gap-4'>
                <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wider ${config.color}`}>
                    {status}
                </span>
            </div>
        </div>
    )
}

const ProjectCardSkeleton = () => {
    return (
        <div className='p-4 border border-border rounded-xl flex items-center justify-between my-3 animate-pulse bg-muted/20'>
            <div className='flex items-center gap-4'>
                <div className='space-y-2'>
                    <div className='h-4 w-32 bg-muted rounded'></div>
                    <div className='h-3 w-20 bg-muted rounded'></div>
                </div>
            </div>
            <div className='h-6 w-16 bg-muted rounded-full'></div>
        </div>
    )
}