import { X } from 'lucide-react'
import React from 'react'

const ShowProjectSidebar = ({ showProjectSidebar, setShowProjectSidebar }) => {
    return (
        <div
            onClick={(e) => e.stopPropagation()}
            className={`fixed inset-0 z-50 transition-opacity ${showProjectSidebar ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />
            <div className="fixed right-0 top-0 h-full w-80 bg-white dark:bg-[#0f172a] z-50 p-4 rounded-l-2xl border border-slate-200/50 dark:border-slate-800/50 shadow-lg">
                <div className='flex items-center justify-between mb-4'>
                    <h2 className="text-xl font-semibold  text-slate-900 dark:text-slate-100">Your Projects</h2>
                    <span
                        onClick={() => setShowProjectSidebar(false)}
                        className='hover:bg-slate-800 cursor-pointer active:bg-slate-900 p-1.5 rounded-full'>
                        <X size={14} />
                    </span>
                </div>
                <ul className="space-y-3">
                    <li className="flex items-center gap-3 p-3 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200/50 dark:border-slate-700/50">
                        <div className="h-8 w-8 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold">K</div>
                        <div>
                            <p className="font-medium text-slate-900 dark:text-slate-100">Kalahvengam 2026</p>
                            <p className="text-sm text-slate-600 dark:text-slate-300">Due: Dec 2026</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default ShowProjectSidebar
