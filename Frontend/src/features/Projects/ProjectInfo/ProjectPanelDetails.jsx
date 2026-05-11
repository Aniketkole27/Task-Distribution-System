import React from 'react'
import { Calendar, Flag, Users, Clock, CircleDot, FileText, Layout, CheckCircle2 } from 'lucide-react'

const priorityConfig = {
    urgent: { label: 'Urgent', color: 'bg-rose-500/10 text-rose-500 border-rose-500/20' },
    medium: { label: 'Medium', color: 'bg-amber-500/10 text-amber-500 border-amber-500/20' },
    low: { label: 'Low', color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' },
}

const statusConfig = {
    active: { label: 'Active', color: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
    completed: { label: 'Completed', color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' },
    failed: { label: 'Failed', color: 'bg-rose-500/10 text-rose-500 border-rose-500/20' },
}

const formatDate = (dateStr) => {
    if (!dateStr) return '—'
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}

const ProjectPanelDetails = ({ project }) => {
    const priority = priorityConfig[project?.priority] || priorityConfig.medium
    const status = statusConfig[project?.status] || statusConfig.active

    return (
        <div className="max-w-5xl mx-auto py-8 px-4 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-8">
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full border ${status.color}`}>
                            <CircleDot size={12} />
                            {status.label}
                        </span>
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full border ${priority.color}`}>
                            <Flag size={12} />
                            {priority.label}
                        </span>
                    </div>
                    <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
                        {project?.name || 'Untitled Project'}
                    </h1>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground bg-muted/30 px-4 py-2 rounded-xl border border-border/50">
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase font-bold tracking-widest opacity-50">Last Updated</span>
                        <span className="font-medium text-foreground">{formatDate(project?.updatedAt)}</span>
                    </div>
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    <section className="bg-muted/20 rounded-2xl p-6 border border-border/50 space-y-4">
                        <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">
                            <FileText size={18} className="text-blue-500" />
                            Project Overview
                        </h3>
                        <p className="text-lg text-foreground/80 leading-relaxed font-medium">
                            {project?.description || 'No description provided for this project.'}
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground px-2">
                            <Users size={18} className="text-blue-500" />
                            Team Composition ({project?.teamMembers?.length || 0})
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {project?.teamMembers?.map((member, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center gap-3 p-3 bg-card border border-border rounded-xl hover:border-blue-500/50 transition-colors group shadow-sm"
                                >
                                    <div className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold group-hover:bg-blue-600 group-hover:text-white transition-all">
                                        {typeof member === 'string' ? member.charAt(0).toUpperCase() : (member?.name?.charAt(0)?.toUpperCase() || '?')}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold">{typeof member === 'string' ? member : (member?.name || 'Team Member')}</span>
                                        <span className="text-xs text-muted-foreground">{typeof member === 'object' ? member.email : 'Collaborator'}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                    <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-6">
                        <div className="space-y-4">
                            <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground border-b border-border pb-2">Timeline</h4>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Calendar size={14} />
                                        <span>Due Date</span>
                                    </div>
                                    <span className="text-sm font-bold">{project?.dueDate}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Clock size={14} />
                                        <span>Created</span>
                                    </div>
                                    <span className="text-sm font-bold">{formatDate(project?.createdAt)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground border-b border-border pb-2">Properties</h4>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Layout size={14} />
                                        <span>Framework</span>
                                    </div>
                                    <span className="text-sm font-bold">Standard</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <CheckCircle2 size={14} />
                                        <span>Approval</span>
                                    </div>
                                    <span className="text-sm font-bold text-emerald-500">Required</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 bg-blue-600 rounded-2xl text-white space-y-2 shadow-xl shadow-blue-500/20">
                        <h4 className="text-xs font-bold uppercase tracking-wider opacity-80">Project Goal</h4>
                        <p className="text-sm font-medium leading-relaxed italic">
                            "Delivering excellence through collaborative task management and efficient resource distribution."
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectPanelDetails

