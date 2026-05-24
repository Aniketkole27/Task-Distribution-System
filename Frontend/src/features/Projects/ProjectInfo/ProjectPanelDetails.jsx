import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Calendar, Flag, Users, Clock, CircleDot, FileText, Layout, CheckCircle2, Pencil, History, Trash2, AlertTriangle, X, Loader2 } from 'lucide-react'
import EditProjectModal from '../components/EditProjectModal'
import { deleteProject } from '../api/deleteProject'
import { removeProjectFromStore } from '@/app/projectDataSlice'

const priorityConfig = {
    high: { label: 'High', color: 'bg-rose-500/10 text-rose-500 border-rose-500/20' },
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
    const [showEditModal, setShowEditModal] = useState(false)
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
    const [deleteLoading, setDeleteLoading] = useState(false)
    const [deleteError, setDeleteError] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userProfile = useSelector(state => state.currentUser.profile)
    const isAdmin = userProfile?.role === 'admin'

    const priority = priorityConfig[project?.priority] || priorityConfig.medium
    const status = statusConfig[project?.status] || statusConfig.active

    const isUpdated = project?.updatedAt && project?.createdAt &&
        (new Date(project.updatedAt).getTime() - new Date(project.createdAt).getTime() > 1000)

    return (
        <div className="max-w-5xl mx-auto py-8 px-4 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {showEditModal && (
                <EditProjectModal
                    project={project}
                    setOpen={setShowEditModal}
                />
            )}

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
                    <h1 className="text-4xl font-extrabold tracking-tight text-foreground flex flex-wrap items-center gap-3">
                        {project?.name || 'Untitled Project'}
                        {isUpdated && (
                            <span
                                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-500/10 text-blue-500 border border-blue-500/20 uppercase tracking-widest cursor-help shadow-sm animate-in fade-in duration-300"
                                title={`✏️ Edited: Last modified on ${formatDate(project.updatedAt)}`}
                            >
                                <History size={10} strokeWidth={2.5} />
                                Edited
                            </span>
                        )}
                    </h1>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground bg-muted/30 px-4 py-2 rounded-xl border border-border/50">
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase font-bold tracking-widest opacity-50">
                                {isUpdated ? "Modified Date" : "Last Updated"}
                            </span>
                            <span className="font-medium text-foreground">{formatDate(project?.updatedAt)}</span>
                        </div>
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

                    {/* <div className="p-6 bg-blue-600 rounded-2xl text-white space-y-2 shadow-xl shadow-blue-500/20">
                        <h4 className="text-xs font-bold uppercase tracking-wider opacity-80">Project Goal</h4>
                        <p className="text-sm font-medium leading-relaxed italic">
                            "Delivering excellence through collaborative task management and efficient resource distribution."
                        </p>
                    </div> */}
                </div>
            </div>

            {/* Admin Actions — Edit & Delete (admin only) */}
            {isAdmin && (
                <div className="mt-12 pt-8 border-t border-border/30 space-y-4">
                    <div className="flex items-center gap-2 text-muted-foreground/40">
                        <AlertTriangle size={14} />
                        <span className="text-[11px] font-medium">Admin Actions</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setShowEditModal(true)}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-medium text-muted-foreground/60 hover:text-blue-500 border border-border/40 hover:border-blue-500/30 rounded-lg hover:bg-blue-500/5 transition-all cursor-pointer"
                        >
                            <Pencil size={12} />
                            Edit Project
                        </button>
                        <button
                            onClick={() => { setShowDeleteConfirm(true); setDeleteError(''); }}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-medium text-muted-foreground/60 hover:text-rose-500 border border-border/40 hover:border-rose-500/30 rounded-lg hover:bg-rose-500/5 transition-all cursor-pointer"
                        >
                            <Trash2 size={12} />
                            Delete Project
                        </button>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-md mx-4 animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
                        <div className="p-6 space-y-5">
                            {/* Header */}
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center">
                                        <AlertTriangle size={20} className="text-rose-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-foreground">Delete Project</h3>
                                        <p className="text-xs text-muted-foreground">This action cannot be undone</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setShowDeleteConfirm(false)}
                                    className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-lg hover:bg-muted/50 cursor-pointer"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            {/* Warning Message */}
                            <div className="bg-rose-500/5 border border-rose-500/15 rounded-xl p-4 space-y-2">
                                <p className="text-sm text-foreground/80">
                                    You are about to permanently delete <span className="font-bold text-foreground">{project?.name}</span> and all of its associated tasks.
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    All tasks, assignments, and project data will be permanently removed.
                                </p>
                            </div>

                            {/* Error Message */}
                            {deleteError && (
                                <div className="bg-rose-500/10 border border-rose-500/20 rounded-lg px-4 py-2.5 text-sm text-rose-500 font-medium">
                                    {deleteError}
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex items-center gap-3 pt-1">
                                <button
                                    onClick={() => setShowDeleteConfirm(false)}
                                    disabled={deleteLoading}
                                    className="flex-1 px-4 py-2.5 text-sm font-semibold text-foreground bg-muted/40 hover:bg-muted/60 border border-border/60 rounded-xl transition-all cursor-pointer disabled:opacity-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={async () => {
                                        setDeleteLoading(true);
                                        setDeleteError('');
                                        try {
                                            await deleteProject(project._id);
                                            dispatch(removeProjectFromStore(project._id));
                                            setShowDeleteConfirm(false);
                                            // Navigate to projects list based on role
                                            const basePath = userProfile?.role === 'admin' ? '/admin' : userProfile?.role === 'sub-admin' ? '/manager' : '/user';
                                            navigate(`${basePath}/projects`);
                                        } catch (err) {
                                            const status = err.response?.status;
                                            if (status === 403) {
                                                setDeleteError('You do not have permission to delete this project.');
                                            } else if (status === 404) {
                                                setDeleteError('Project not found. It may have already been deleted.');
                                            } else {
                                                setDeleteError('Failed to delete project. Please try again.');
                                            }
                                        } finally {
                                            setDeleteLoading(false);
                                        }
                                    }}
                                    disabled={deleteLoading}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition-all cursor-pointer disabled:opacity-60 shadow-lg shadow-rose-500/20"
                                >
                                    {deleteLoading ? (
                                        <>
                                            <Loader2 size={14} className="animate-spin" />
                                            Deleting...
                                        </>
                                    ) : (
                                        <>
                                            <Trash2 size={14} />
                                            Delete Project
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProjectPanelDetails

