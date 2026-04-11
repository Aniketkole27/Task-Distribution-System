import React, { useEffect, useState, useRef } from 'react'
import { X, Calendar, Flag, Users, Clock, CircleDot, FileText } from 'lucide-react'

const priorityConfig = {
    high: { label: 'High', color: 'bg-red-100 text-red-700 border-red-200' },
    medium: { label: 'Medium', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
    low: { label: 'Low', color: 'bg-green-100 text-green-700 border-green-200' },
}

const statusConfig = {
    active: { label: 'Active', color: 'bg-blue-100 text-blue-700 border-blue-200' },
    completed: { label: 'Completed', color: 'bg-green-100 text-green-700 border-green-200' },
    failed: { label: 'Failed', color: 'bg-red-100 text-red-700 border-red-200' },
}

const formatDate = (dateStr) => {
    if (!dateStr) return '—'
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    })
}

const ProjectPanelDetails = ({ isOpen, setIsOpen, project }) => {
    // Track whether the panel should be visible in the DOM (for exit animation)
    const [visible, setVisible] = useState(false)
    const [animateIn, setAnimateIn] = useState(false)
    const timeoutRef = useRef(null)

    useEffect(() => {
        if (isOpen) {
            // Mount first, then trigger animation on next frame
            setVisible(true)
            document.body.style.overflow = 'hidden'
            // requestAnimationFrame ensures the DOM has the element before we animate
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setAnimateIn(true)
                })
            })
        } else {
            // Animate out first, then unmount after transition ends
            setAnimateIn(false)
            document.body.style.overflow = 'auto'
            timeoutRef.current = setTimeout(() => {
                setVisible(false)
            }, 600) // matches longest transition duration
        }
        return () => {
            clearTimeout(timeoutRef.current)
            document.body.style.overflow = 'auto'
        }
    }, [isOpen])

    const priority = priorityConfig[project?.priority] || priorityConfig.medium
    const status = statusConfig[project?.status] || statusConfig.active

    if (!visible) return null

    return (
        <div className="relative">
            {/* Overlay — fade in/out */}
            <div
                className="fixed inset-0 z-40 transition-all duration-300 ease-in-out"
                style={{
                    backgroundColor: animateIn ? 'rgba(28, 25, 23, 0.4)' : 'rgba(28, 25, 23, 0)',
                    pointerEvents: animateIn ? 'auto' : 'none',
                }}
                onClick={() => setIsOpen(false)}
            />

            {/* Side Panel — slide + fade */}
            <div
                className="fixed top-0 right-0 h-full w-105 bg-white z-50 flex flex-col"
                style={{
                    transform: animateIn ? 'translateX(0)' : 'translateX(100%)',
                    opacity: animateIn ? 1 : 0.5,
                    boxShadow: animateIn
                        ? '-12px 0 40px rgba(0, 0, 0, 0.15)'
                        : '-4px 0 12px rgba(0, 0, 0, 0)',
                    transition: 'transform 550ms cubic-bezier(0.4, 0, 0.2, 1), opacity 400ms ease, box-shadow 500ms ease',
                }}
            >
                {/* Header */}
                <div
                    className="flex items-center justify-between px-6 py-4 border-b border-stone-200"
                    style={{
                        opacity: animateIn ? 1 : 0,
                        transform: animateIn ? 'translateY(0)' : 'translateY(-8px)',
                        transition: 'opacity 300ms ease 100ms, transform 300ms ease 100ms',
                    }}
                >
                    <h2 className="text-lg font-semibold text-black">Project Details</h2>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="cursor-pointer p-1.5 rounded-full hover:bg-stone-200 active:bg-stone-300 transition-colors duration-200"
                    >
                        <X size={18} className="text-stone-600" />
                    </button>
                </div>

                {/* Content — staggered fade-in for each section */}
                <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">

                    {/* Project Name */}
                    <AnimatedSection animateIn={animateIn} delay={120}>
                        <h3 className="text-xl font-bold text-black leading-snug">
                            {project?.name || 'Untitled Project'}
                        </h3>
                    </AnimatedSection>

                    {/* Status & Priority Badges */}
                    <AnimatedSection animateIn={animateIn} delay={180}>
                        <div className="flex items-center gap-3">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full border ${status.color}`}>
                                <CircleDot size={12} />
                                {status.label}
                            </span>
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full border ${priority.color}`}>
                                <Flag size={12} />
                                {priority.label}
                            </span>
                        </div>
                    </AnimatedSection>

                    {/* Description */}
                    <AnimatedSection animateIn={animateIn} delay={240}>
                        <DetailSection icon={<FileText size={16} />} label="Description">
                            <p className="text-sm text-stone-600 leading-relaxed">
                                {project?.description || 'No description provided.'}
                            </p>
                        </DetailSection>
                    </AnimatedSection>

                    {/* Due Date */}
                    <AnimatedSection animateIn={animateIn} delay={300}>
                        <DetailSection icon={<Calendar size={16} />} label="Due Date">
                            <p className="text-sm font-medium text-black">
                                {project?.dueDate}
                            </p>
                        </DetailSection>
                    </AnimatedSection>

                    {/* Team Members */}
                    <AnimatedSection animateIn={animateIn} delay={360}>
                        <DetailSection icon={<Users size={16} />} label={`Team Members (${project?.teamMembers?.length || 0})`}>

                            {project?.teamMembers?.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {project.teamMembers.map((member, idx) => (
                                        <span
                                            key={idx}
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-stone-100 text-stone-700 rounded-full border border-stone-200"
                                        >
                                            <span className="w-5 h-5 rounded-full bg-stone-300 flex items-center justify-center text-[10px] font-bold text-stone-600">
                                                {typeof member === 'string' ? member.charAt(0).toUpperCase() : (member?.name?.charAt(0)?.toUpperCase() || '?')}
                                            </span>
                                            {typeof member === 'string' ? member : (member?.name || member?.email || 'Member')}
                                        </span>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-stone-400 italic">No members assigned</p>
                            )}
                        </DetailSection>
                    </AnimatedSection>

                    {/* Timestamps */}
                    <AnimatedSection animateIn={animateIn} delay={420}>
                        <DetailSection icon={<Clock size={16} />} label="Timeline">
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-stone-500">Created</span>
                                    <span className="font-medium text-black">{formatDate(project?.createdAt)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-stone-500">Last Updated</span>
                                    <span className="font-medium text-black">{formatDate(project?.updatedAt)}</span>
                                </div>
                            </div>
                        </DetailSection>
                    </AnimatedSection>
                </div>
            </div>
        </div>
    )
}

/** Wrapper that staggers each content section with a delay */
const AnimatedSection = ({ animateIn, delay = 0, children }) => (
    <div
        style={{
            opacity: animateIn ? 1 : 0,
            transform: animateIn ? 'translateY(0)' : 'translateY(12px)',
            transition: `opacity 350ms ease ${delay}ms, transform 350ms ease ${delay}ms`,
        }}
    >
        {children}
    </div>
)

const DetailSection = ({ icon, label, children }) => (
    <div className="space-y-2">
        <div className="flex items-center gap-2 text-stone-500">
            {icon}
            <span className="text-xs font-semibold uppercase tracking-wider">{label}</span>
        </div>
        <div className="pl-6">
            {children}
        </div>
    </div>
)

export default ProjectPanelDetails
