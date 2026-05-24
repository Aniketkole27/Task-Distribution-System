import React, { useState } from 'react'
import { ArrowUpRight, ChevronRight, Plus, FolderKanban, Info } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import ProjectPanelDetails from './ProjectPanelDetails'
import { useSelector } from 'react-redux'

const NavigationSection = ({ setOpenTask, selectedProjectDetails, activeTab, setActiveTab }) => {
    const navigate = useNavigate()
    const userProfile = useSelector(state => state.currentUser.profile)

    // Permission Logic
    const getBasePath = () => {
        if (userProfile?.role === 'admin') return '/admin'
        if (userProfile?.role === 'sub-admin') return '/manager'
        return '/user'
    }

    const basePath = getBasePath()
    const isAdmin = userProfile?.role === 'admin'
    const isSubAdmin = userProfile?.role === 'sub-admin'
    const canCreateTask = isAdmin || isSubAdmin

    return (
        <div className='flex justify-between items-center px-4 py-3 bg-background/50 backdrop-blur-md sticky top-0 z-40 border-b border-border/50'>
            {/* Breadcrumbs & Tabs Section */}
            <div className='flex items-center gap-6'>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-muted/40 rounded-full border border-border/50 shadow-sm">
                    <button
                        onClick={() => navigate(`${basePath}/projects`)}
                        className="text-muted-foreground hover:text-blue-500 transition-colors flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider"
                    >
                        <FolderKanban size={14} />
                        Projects
                    </button>

                    <ChevronRight size={14} className="text-muted-foreground/40" />

                    <div className='flex items-center gap-1.5'>
                        <span className="text-foreground font-bold text-xs uppercase tracking-wider">
                            {selectedProjectDetails?.name}
                        </span>
                    </div>
                </div>

                {/* Modern Tabs */}
            </div>

            <div className='flex items-center p-1 bg-muted/50 rounded-xl border border-border/40 shadow-inner'>
                <button
                    onClick={() => setActiveTab('tasks')}
                    className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 ${activeTab === 'tasks'
                        ? 'bg-sky-500/8 dark:bg-sky-500/15 text-sky-600 dark:text-sky-400 border border-sky-500/30 dark:border-sky-500/40 shadow-sm'
                        : 'text-muted-foreground hover:text-foreground hover:bg-background/50'}`}
                >
                    Tasks
                </button>
                <button
                    onClick={() => setActiveTab('details')}
                    className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 ${activeTab === 'details'
                        ? 'bg-sky-500/8 dark:bg-sky-500/15 text-sky-600 dark:text-sky-400 border border-sky-500/30 dark:border-sky-500/40 shadow-sm'
                        : 'text-muted-foreground hover:text-foreground hover:bg-background/50'}`}
                >
                    Project Info
                </button>
            </div>

            {/* Actions Section */}
            <div className='flex items-center gap-3'>
                {canCreateTask && (
                    <button
                        onClick={() => setOpenTask(true)}
                        className="flex items-center gap-1.5 px-5 py-2.5 bg-sky-500/8 dark:bg-sky-500/15 hover:bg-sky-500/15 dark:hover:bg-sky-500/25 text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 rounded-full font-semibold text-sm border border-sky-500/30 dark:border-sky-500/40 hover:border-sky-500/50 dark:hover:border-sky-500/60 shadow-[0_2px_8px_rgba(14,165,233,0.08)] dark:shadow-[0_2px_12px_rgba(14,165,233,0.15)] active:scale-[0.97] transition-all duration-300 cursor-pointer"
                    >
                        <Plus size={18} />
                        Create Task
                    </button>
                )}
            </div>
        </div>
    )
}

export default NavigationSection

