import { useState } from "react";
import { Bookmark, Calendar, User, Layout, Clock } from "lucide-react";
import TaskDetailsModal from "./TaskDetailsModal";

const TaskCard = ({ task, status }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
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
        high: { label: 'Urgent', dot: 'bg-rose-500', text: 'text-rose-500', bg: 'bg-rose-500/10', border: 'border-rose-500/20' },
        medium: { label: 'Medium', dot: 'bg-amber-500', text: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
        default: { label: 'Low', dot: 'bg-emerald-500', text: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' }
    };

    const config = priorityConfig[priority.toLowerCase()] || priorityConfig.default;

    return (
        <>
            <div
                className="group relative  bg-background dark:bg-background border border-border rounded-xl p-4 hover:border-blue-500/50 transition-all duration-300 cursor-pointer flex flex-col gap-4 shadow-sm hover:shadow-md active:scale-[0.98]"
                onClick={() => setIsModalOpen(true)}
            >
                {/* Header: Priority & Assignee */}
                <div className="flex items-center justify-between">
                    <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-lg border ${config.bg} ${config.border}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${config.text}`}>
                            {config.label}
                        </span>
                    </div>
                    <span className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">{assignedBy}</span>
                </div>

                {/* Title & Description */}
                <div className="space-y-1.5">
                    <h4 className="text-sm font-bold text-foreground leading-snug group-hover:text-blue-500 transition-colors duration-300">
                        {title}
                    </h4>
                    <p className="text-[11px] text-muted-foreground/80 leading-relaxed line-clamp-2 font-medium italic">
                        "{description}"
                    </p>
                </div>

                {/* Footer: Project & Time */}
                <div className="pt-2 border-t border-border/50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-muted flex items-center justify-center border border-border">
                            <Layout className="w-3 h-3 text-blue-500" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[8px] text-muted-foreground/60 uppercase font-bold leading-none mb-1">Project</span>
                            <span className="text-[10px] font-bold text-foreground leading-none">{projectName}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-muted border border-border">
                        <Clock className="w-3 h-3 text-muted-foreground" />
                        <span className="text-[10px] font-bold text-foreground">{dueDate}</span>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <TaskDetailsModal task={task} status={status} onClose={() => setIsModalOpen(false)} />
            )}
        </>
    );
};

export default TaskCard;