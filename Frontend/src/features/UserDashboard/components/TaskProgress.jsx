const TaskProgress = ({ total = 0, completed = 0 }) => {
    // Calculate percentage, handling division by zero
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    // SVG circle properties
    const strokeDasharray = 100;
    // Offset calculation: 100 means 0%, 0 means 100%
    const strokeDashoffset = strokeDasharray - percentage;
    const remaining = total - completed;

    return (
        <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm w-full lg:w-1/3 flex flex-col justify-between">
            <div>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-1">Completion Rate</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Your overall task completion status</p>
            </div>
            
            <div className="flex flex-col items-center justify-center flex-1">
                {/* Custom Circular Progress using Tailwind (SVG) */}
                <div className="relative w-40 h-40 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-slate-100 dark:text-slate-800" strokeWidth="3"></circle>
                        <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-emerald-500 transition-all duration-1000 ease-out" strokeWidth="3" strokeDasharray={strokeDasharray} strokeDashoffset={strokeDashoffset}></circle>
                    </svg>
                    <div className="absolute flex flex-col items-center justify-center">
                        <span className="text-3xl font-bold text-slate-800 dark:text-slate-100">{percentage}%</span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">Completed</span>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                    <span className="text-slate-600 dark:text-slate-300">Done ({completed})</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                    <span className="text-slate-600 dark:text-slate-300">Remaining ({remaining})</span>
                </div>
            </div>
        </div>
    );
};

export default TaskProgress;
