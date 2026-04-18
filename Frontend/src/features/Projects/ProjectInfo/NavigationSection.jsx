import React, { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import ProjectPanelDetails from './ProjectPanelDetails'

const NavigationSection = ({ setOpenTask, selectedProjectDetails }) => {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false);
    console.log("selectedProjectDetails = ", selectedProjectDetails)
    return (
        <div className='flex justify-between items-center mx-4'>
            <div className='flex flex-col gap-3'>
                <div className="flex items-center gap-1 text-sm text-foreground dark:text-foreground">
                    <button
                        onClick={() => navigate('/admin/projects')}
                        className="hover:text-blue-500 flex items-center gap-1 text-sm text-foreground dark:text-foreground"
                    >
                        projects
                    </button>
                    <span>/</span>
                    <div
                        onClick={() => setIsOpen(true)}
                        className='hover:text-blue-500 cursor-pointer flex items-center gap-1 text-sm text-foreground'>
                        <span className="text-foreground dark:text-foreground font-medium">
                            {selectedProjectDetails.name}
                        </span>
                        <span className='cursor-pointer p-1 text-foreground dark:text-foreground rounded-full hover:bg-stone-300 dark:hover:bg-border active:bg-stone-400'>
                            <ArrowUpRight size={13} />
                        </span>
                    </div>
                </div>

            </div>
            <div className='flex flex-col gap-2'>
                <button
                    onClick={() => setOpenTask(true)}
                    className='cursor-pointer text-shadow-xs border border-border dark:border-border  px-4 py-2 rounded font-medium text-foreground dark:text-foreground shadow hover:border-blue-300 hover:bg-blue-100  hover:text-blue-500 active:bg-blue-200 transition-colors duration-300'
                >
                    Create Task
                </button>
                <ProjectPanelDetails
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    project={selectedProjectDetails}
                />
            </div>
        </div>
    )
}

export default NavigationSection
