import TaskCard from "./TaskCard"

const SectionCard = ({ title, tasks = [] }) => {
    // Define subtle, premium background and border colors for each column
    const sectionStyles = {
        "Todo": "bg-slate-50/80 dark:bg-slate-900/20 border-slate-200/60 dark:border-slate-800/60",
        "In Progress": "bg-blue-50/50 dark:bg-blue-900/10 border-blue-200/60 dark:border-blue-900/30",
        "Review": "bg-amber-50/50 dark:bg-amber-900/10 border-amber-200/60 dark:border-amber-900/30",
        "Done": "bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-200/60 dark:border-emerald-900/30"
    };

    const currentStyle = sectionStyles[title] || sectionStyles["Todo"];

    return (
        <div className={`border rounded-xl p-4 h-full min-h-[calc(100vh-200px)] transition-colors duration-300 flex flex-col ${currentStyle}`}>
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">{title}</h3>
                <div className="px-2 py-0.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-500 shadow-sm">
                    {tasks.length}
                </div>
            </div>

            <div className="space-y-3 flex-1 overflow-y-auto hide-scrollbar">
                {
                    tasks.map((task) => (
                        <TaskCard key={task.id} task={task} />
                    ))
                }
            </div>
        </div>
    )
}

export default SectionCard