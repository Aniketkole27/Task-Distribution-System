import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Calendar } from 'lucide-react'

const TotalProjects = () => {
    const projectData = useSelector((state) => state.projectData.data)
    const searchResult = useSelector((state) => state.projectData.projectSearch)
    const selectedFilter = useSelector(state => state.projectData.selected)
    const currentUser = useSelector(state => state.currentUser.profile)
    const onlyAccess = currentUser.role === "admin" || currentUser.role === "sub-admin"

    const filteredResult = useMemo(() => {
        return projectData.filter((project) =>
            (!searchResult || project.name.toLowerCase().includes(searchResult.toLowerCase())) &&
            (selectedFilter === "all" || project.status.toLowerCase().includes(selectedFilter.toLowerCase()))
        )
    }, [projectData, searchResult, selectedFilter])



    return (
        <div className='p-6 mx-4 bg-card border border-border rounded-xl shadow-sm mt-6'>
            <div className='flex items-center justify-between mb-8'>
                <div className='space-y-1'>
                    <h2 className='text-lg font-bold tracking-tight'>All Projects</h2>
                    <p className='text-xs text-muted-foreground'>Manage and track your active workspace projects</p>
                </div>
            </div>

            <div className='space-y-4'>
                {filteredResult.map((project) => (
                    <ProjectItem
                        key={project._id}
                        id={project._id}
                        title={project.name}
                        dueDate={project.dueDate}
                        status={project.status}
                        onlyAccess={onlyAccess}
                    />
                ))}

                {filteredResult.length === 0 && (
                    <div className='flex flex-col items-center justify-center py-12 text-center'>
                        <div className='w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-3'>
                            <Calendar size={20} className='text-muted-foreground' />
                        </div>
                        <h3 className='text-sm font-semibold text-muted-foreground'>No projects found</h3>
                    </div>
                )}
            </div>
        </div>
    )
}

export default TotalProjects

const ProjectItem = ({ id, title, dueDate, status, onlyAccess }) => {

    const currentUser = useSelector(state => state.currentUser.profile)
    const navigate = useNavigate()

    const statusConfig = {
        active: { color: 'text-blue-600 bg-blue-50 border-blue-100' },
        completed: { color: 'text-green-600 bg-green-50 border-green-100' },
        failed: { color: 'text-red-600 bg-red-50 border-red-100' },
        pending: { color: 'text-amber-600 bg-amber-50 border-amber-100' }
    }

    const config = statusConfig[status.toLowerCase()] || statusConfig.pending

    return (
        <div
            onClick={() => navigate(`${onlyAccess ? currentUser.role === "admin" ? "/admin" : "/manager" : ""}/projects/${id}`)}
            className='group p-4 border border-border rounded-xl flex items-center justify-between transition-all hover:shadow-md hover:border-primary/20 hover:bg-muted/30 cursor-pointer animate-in fade-in slide-in-from-bottom-2 duration-300'
        >
            <div className='space-y-1'>
                <h3 className='text-sm font-semibold group-hover:text-primary transition-colors'>{title}</h3>
                <div className='flex items-center gap-3 text-[10px] text-muted-foreground'>
                    <span className='flex items-center gap-1'>
                        <Calendar size={12} strokeWidth={2.5} />
                        Due {dueDate}
                    </span>
                </div>
            </div>

            <div className='flex items-center gap-4'>
                <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wider ${config.color}`}>
                    {status}
                </span>
            </div>
        </div>
    )
}
