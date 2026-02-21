import { ArrowLeft, ArrowUpRight, Folder, Slash } from 'lucide-react'
import React from 'react'

const NavigationSection = ({ setProjectDetails }) => {
    return (
        <div className='flex justify-between items-center mx-4'>
            <div
                className='flex flex-col gap-3'
            >
                <div
                    className='  items-center w-fit cursor-pointer'
                    onClick={() => setProjectDetails(false)}
                >
                    <h1 className='select-none text-black hover:text-blue-600 font-semibold bg-stone-300 px-2 py-0.5 rounded-xl'>/ Projects</h1>
                </div>

                <div className='flex items-center'>
                    <h1 className='text-xl font-semibold'>Task Distribution System</h1>
                    <span className='cursor-pointer p-1 rounded-full hover:bg-stone-200 active:bg-stone-300'>
                        <ArrowUpRight size={16} />
                    </span>
                </div>
            </div>
            <div className='flex flex-col gap-2'>
                <button
                    className='cursor-pointer text-shadow-xs border border-stone-300  px-4 py-2 rounded font-medium text-black shadow hover:border-blue-300 hover:bg-blue-100  h hover:text-blue-500 active:bg-blue-200 transition-colors duration-300'
                >
                    Create Task
                </button>
            </div>
        </div>
    )
}

export default NavigationSection
