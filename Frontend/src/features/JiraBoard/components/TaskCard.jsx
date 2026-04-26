import { Bookmark, Calendar, User, Layout, Clock } from "lucide-react";

const TaskCard = ({ task }) => {
    const {
        id = "TSK-000",
        title = "Optimize experience for mobile web",
        description = "Implement responsive design patterns for the checkout flow and ensure cross-browser compatibility.",
        projectName = "E-Commerce App",
        assignedBy = "John Doe",
        dueDate = "Dec 15, 2027",
        priority = "High"
    } = task || {};

    const priorityConfig = {
        high: { label: 'Urgent', dot: 'bg-red-500', text: 'text-red-600 dark:text-red-400', bg: 'bg-red-500/10' },
        medium: { label: 'Medium', dot: 'bg-amber-500', text: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-500/10' },
        default: { label: 'Low', dot: 'bg-emerald-500', text: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-500/10' }
    };

    const config = priorityConfig[priority.toLowerCase()] || priorityConfig.default;

    return (
        <div className="group relative bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 hover:border-indigo-500/50 transition-all duration-300 cursor-grab flex flex-col gap-3 overflow-hidden shadow-sm hover:shadow-md dark:shadow-lg">
            {/* Subtle Accent Glow */}
            <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-indigo-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            {/* Header: Label & ID */}
            <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-1.5">
                    <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700/50 ${config.bg}`}>
                        <div className={`w-1 h-1 rounded-full ${config.dot}`} />
                        <span className={`text-[9px] font-bold uppercase tracking-wider ${config.text}`}>
                            {config.label}
                        </span>
                    </div>
                    <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 tracking-tight">{assignedBy}</span>
                </div>
            </div>

            {/* Title & Description */}
            <div className="flex flex-col gap-1 relative z-10">
                <h4 className="text-[14px] font-bold text-slate-800 dark:text-slate-100 leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                    {title}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2 font-medium">
                    {description}
                </p>
            </div>

            {/* Subtle Divider */}
            <div className="h-px w-full bg-slate-200 dark:bg-slate-800/50" />

            {/* Footer: Project & Time */}
            <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-md bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700">
                        <Layout className="w-3 h-3 text-indigo-500 dark:text-indigo-400" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[8px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter leading-none mb-0.5">Project</span>
                        <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 leading-none">{projectName}</span>
                    </div>
                </div>

                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50">
                    <Clock className="w-3 h-3 text-slate-400 dark:text-slate-500" />
                    <span className="text-[9px] font-bold text-slate-600 dark:text-slate-400">{dueDate}</span>
                </div>
            </div>
        </div>
    );
};

export default TaskCard;