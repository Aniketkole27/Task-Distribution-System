import React, { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const NavigationSection = ({ setOpenTask }) => {
    const navigate = useNavigate()
    return (
        <div className='flex justify-between items-center mx-4'>
            <div className='flex flex-col gap-3'>
                <div className="flex items-center gap-1 text-sm text-black">
                    <button
                        onClick={() => navigate('/admin/projects')}
                        className="hover:text-blue-500 flex items-center gap-1 text-sm text-black"
                    >
                        Projects
                    </button>
                    <span>/</span>
                    <span className="text-black font-medium">
                        Task Distribution System
                    </span>
                    <span className='cursor-pointer p-1 text-black rounded-full hover:bg-stone-300 active:bg-stone-400'>
                        <ArrowUpRight size={13} />
                    </span>
                </div>

            </div>
            <div className='flex flex-col gap-2'>
                <button
                    onClick={() => setOpenTask(true)}
                    className='cursor-pointer text-shadow-xs border border-stone-300  px-4 py-2 rounded font-medium text-black shadow hover:border-blue-300 hover:bg-blue-100  hover:text-blue-500 active:bg-blue-200 transition-colors duration-300'
                >
                    Create Task
                </button>
            </div>
        </div>
    )
}

export default NavigationSection
