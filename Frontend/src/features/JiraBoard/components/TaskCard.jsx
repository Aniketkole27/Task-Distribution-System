import { useState } from "react";
import { Bookmark, Calendar, User, Layout, Clock } from "lucide-react";
import TaskDetailsModal from "./TaskDetailsModal";

const TaskCard = ({ task, status }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {
        _id: id = "TSK-000",
        title = "Optimize experience for mobile web",
        description = "Implement responsive design patterns for the checkout flow and ensure cross-browser compatibility.",
        project = { name: "E-Commerce App" },
        assignedBy = { name: "John Doe" },
        dueDate = "Dec 15, 2027",
        priority = "High"
    } = task || {};

    const priorityConfig = {
        high: { label: 'Urgent', dot: 'bg-rose-500', text: 'text-rose-500', bg: 'bg-rose-500/10', border: 'border-rose-500/20' },
        medium: { label: 'Medium', dot: 'bg-amber-500', text: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
        default: { label: 'Low', dot: 'bg-emerald-500', text: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' }
    };

    const config = priorityConfig[priority.toLowerCase()] || priorityConfig.default;

    const isRejected = task.status === 'rejected';

    return (
        <>
            <div
                className={`group relative bg-background dark:bg-background border rounded-xl p-4 transition-all duration-300 cursor-pointer flex flex-col gap-4 shadow-sm hover:shadow-md active:scale-[0.98] ${isRejected ? 'border-rose-500/50 bg-rose-500/5 hover:border-rose-500' : 'border-border hover:border-blue-500/50'}`}
                onClick={() => setIsModalOpen(true)}
            >
                {/* Header: Priority & Assignee */}
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <div className={`shrink-0 flex items-center gap-1.5 px-2 py-0.5 rounded-lg border ${config.bg} ${config.border}`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
                            <span className={`text-[10px] font-bold uppercase tracking-wider ${config.text}`}>
                                {config.label}
                            </span>
                        </div>
                        {isRejected && (
                            <div className="shrink-0 flex items-center gap-1.5 px-2 py-0.5 rounded-lg border border-rose-500/20 bg-rose-500/10">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-500">
                                    Rejected
                                </span>
                            </div>
                        )}
                    </div>
                    <span className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest truncate">
                        {assignedBy?.name || assignedBy}
                    </span>
                </div>

                {/* Title & Description */}
                <div className="space-y-1.5">
                    <h4 className="text-sm font-bold text-foreground leading-snug group-hover:text-blue-500 transition-colors duration-300 line-clamp-2 break-words">
                        {title}
                    </h4>
                    <p className="text-[11px] text-muted-foreground/80 leading-relaxed line-clamp-2 font-medium italic">
                        "{description}"
                    </p>
                </div>

                {/* Footer: Project & Time */}
                <div className="pt-2 border-t border-border/50 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                        <div className="shrink-0 w-6 h-6 rounded-lg bg-muted flex items-center justify-center border border-border">
                            <Layout className="w-3 h-3 text-blue-500" />
                        </div>
                        <div className="flex flex-col min-w-0">
                            <span className="text-[8px] text-muted-foreground/60 uppercase font-bold leading-none mb-1">Project</span>
                            <span className="text-[10px] font-bold text-foreground leading-tight ">{project.name}</span>
                        </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-1.5 px-2 py-1 rounded-lg bg-muted border border-border">
                        <Clock className="w-3 h-3 text-muted-foreground" />
                        <span className="text-[10px] font-bold text-foreground whitespace-nowrap">{dueDate}</span>
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