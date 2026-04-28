import { X, Layout, Clock, User, AlignLeft, Flag, Hash, Calendar, Send } from "lucide-react";
import { useState } from "react";
import ReviewSubmissionModal from "./ReviewSubmissionModal";

const TaskDetailsModal = ({ task, status = "Todo", onClose }) => {
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    if (!task) return null;

    const {
        id = "TSK-000",
        title = "Optimize experience for mobile web",
        description = "Implement responsive design patterns for the checkout flow and ensure cross-browser compatibility.",
        projectName = "E-Commerce App",
        assignedBy = "John Doe",
        dueDate = "Dec 15, 2027",
        priority = "High"
    } = task;

    const priorityConfig = {
        high: { label: 'Urgent', dot: 'bg-red-500', text: 'text-red-600 dark:text-red-400', bg: 'bg-red-500/10' },
        medium: { label: 'Medium', dot: 'bg-amber-500', text: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-500/10' },
        default: { label: 'Low', dot: 'bg-emerald-500', text: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-500/10' }
    };

    const config = priorityConfig[priority.toLowerCase()] || priorityConfig.default;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6" onClick={onClose}>
            <div
                className="relative w-full max-w-2xl bg-white dark:bg-[#0f172a] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header Pattern / Accent */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500" />

                {/* Header Actions */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <Hash className="w-3.5 h-3.5 text-slate-500" />
                            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{id}</span>
                        </div>
                        <div className={`flex items-center gap-1.5 px-2 py-1 rounded-md border border-slate-200 dark:border-slate-700/50 ${config.bg}`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
                            <span className={`text-xs font-bold uppercase tracking-wider ${config.text}`}>
                                {config.label}
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex flex-col md:flex-row p-6 gap-8 overflow-y-auto max-h-[70vh]">
                    {/* Main Content Area */}
                    <div className="flex-1 flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 leading-tight">
                                {title}
                            </h2>
                        </div>

                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
                                <AlignLeft className="w-5 h-5 text-indigo-500" />
                                <h3 className="text-sm font-bold uppercase tracking-wider">Description</h3>
                            </div>
                            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700/50">
                                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                                    {description}
                                </p>
                            </div>
                        </div>

                        {/* Additional Sections for Review and Done */}
                        {(status === "Review" || status === "Done") && (
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
                                    <AlignLeft className="w-5 h-5 text-emerald-500" />
                                    <h3 className="text-sm font-bold uppercase tracking-wider">Submission Notes</h3>
                                </div>
                                <div className="bg-emerald-50/50 dark:bg-emerald-500/10 rounded-xl p-4 border border-emerald-200/50 dark:border-emerald-500/20">
                                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                                        {task.reviewDescription || "I have completed the responsive design and tested it across modern browsers as requested."}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Admin feedback for Review and Done */}
                        {(status === "Review" || status === "Done") && (
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center justify-between text-slate-800 dark:text-slate-200">
                                    <div className="flex items-center gap-2">
                                        <User className="w-5 h-5 text-amber-500" />
                                        <h3 className="text-sm font-bold uppercase tracking-wider">Admin Feedback</h3>
                                    </div>
                                    {status === "Review" && (
                                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400">
                                            {task.reviewStatus || "Pending Review"}
                                        </span>
                                    )}
                                </div>
                                {
                                    status === "Done" && (
                                        <div className="bg-amber-50/50 dark:bg-amber-500/10 rounded-xl p-4 border border-amber-200/50 dark:border-amber-500/20">
                                            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                                                {task.adminFeedback || "No feedback from admin."}
                                            </p>
                                        </div>
                                    )
                                }
                            </div>
                        )}
                    </div>

                    {/* Sidebar / Metadata */}
                    <div className="w-full md:w-64 flex flex-col gap-4">
                        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700/50 flex flex-col gap-4">
                            <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Details</h3>

                            <div className="flex items-start gap-3">
                                <Layout className="w-4 h-4 text-slate-400 mt-0.5" />
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-bold text-slate-500 uppercase">Project</span>
                                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{projectName}</span>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <User className="w-4 h-4 text-slate-400 mt-0.5" />
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-bold text-slate-500 uppercase">Assigned By</span>
                                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{assignedBy}</span>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <Calendar className="w-4 h-4 text-slate-400 mt-0.5" />
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-bold text-slate-500 uppercase">Due Date</span>
                                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{dueDate}</span>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <Flag className="w-4 h-4 text-slate-400 mt-0.5" />
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-bold text-slate-500 uppercase">Priority</span>
                                    <span className={`text-sm font-bold ${config.text}`}>{priority}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-sm font-bold rounded-lg transition-colors"
                    >
                        {status === "In Progress" ? "Cancel" : "Close"}
                    </button>

                    {status === "Todo" && (
                        <button
                            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold rounded-lg transition-colors flex items-center gap-2 shadow-sm"
                            onClick={() => {
                                console.log("Add to Progress clicked");
                                onClose();
                            }}
                        >
                            Add to Progress
                        </button>
                    )}

                    {status === "In Progress" && (
                        <button
                            onClick={() => setIsReviewModalOpen(true)}
                            className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-bold rounded-lg transition-colors flex items-center gap-2 shadow-sm"
                        >
                            <Send className="w-4 h-4" />
                            Send for Review
                        </button>
                    )}
                </div>
            </div>

            {isReviewModalOpen && status === "In Progress" && (
                <ReviewSubmissionModal
                    task={task}
                    onClose={() => setIsReviewModalOpen(false)}
                    onSubmit={(desc) => {
                        console.log("Review submitted with description:", desc);
                        setIsReviewModalOpen(false);
                        onClose();
                    }}
                />
            )}
        </div>
    );
};

export default TaskDetailsModal;
