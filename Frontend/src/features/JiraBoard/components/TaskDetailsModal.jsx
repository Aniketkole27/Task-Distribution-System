import { X, Layout, Clock, User, AlignLeft, Flag, Hash, Calendar, Send, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import ReviewSubmissionModal from "./ReviewSubmissionModal";
import { useDispatch, useSelector } from "react-redux";
import { updateTaskStatus } from "../../../app/jiraSlice";

const TaskDetailsModal = ({ task, status: rawStatus = "Todo", onClose }) => {
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [adminNote, setAdminNote] = useState('');
    if (!task) return null;

    const role = useSelector((state) => state.currentUser.profile)?.role;

    // Map backend statuses to UI display labels
    const statusMap = {
        'todo': 'Todo',
        'in-progress': 'In Progress',
        // 'submitted': 'Review',
        'under-review': 'Review',
        'approved': 'Done',
        'rejected': 'Rejected'
    };
    const dispatch = useDispatch();

    const handleUpdateStatus = (newStatus) => {
        const payload = { taskId: task._id, status: newStatus };
        if ((newStatus === 'approved' || newStatus === 'rejected') && adminNote.trim()) {
            payload.adminNote = adminNote.trim();
        }
        dispatch(updateTaskStatus(payload));
        onClose();
    };

    const actualRawStatus = task?.status || rawStatus;
    const status = statusMap[actualRawStatus?.toLowerCase()] || actualRawStatus?.toLowerCase();

    const {
        _id: id = "TSK-000",
        title = "Optimize experience for mobile web",
        description = "Implement responsive design patterns for the checkout flow and ensure cross-browser compatibility.",
        project = { name: "E-Commerce App" },
        assignedBy = { name: "John Doe" },
        dueDate = "Dec 15, 2027",
        priority = "High"
    } = task;

    const priorityConfig = {
        urgent: { label: 'Urgent', dot: 'bg-red-500', text: 'text-red-600 dark:text-red-400', bg: 'bg-red-500/10' },
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
                <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-indigo-500 via-purple-500 to-indigo-500" />

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
                            {/* 
                            <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
                                <AlignLeft className="w-5 h-5 text-emerald-500" />
                                <h3 className="text-sm font-bold uppercase tracking-wider">Submission Notes</h3>
                            </div>
                            <div className="bg-emerald-50/50 dark:bg-emerald-500/10 rounded-xl p-4 border border-emerald-200/50 dark:border-emerald-500/20">
                                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                                    {task.submissionNote || "No submission notes."}
                                </p>
                            </div> */}
                        </div>

                        {/* Additional Sections for Review, Done, and Rejected */}
                        {(status === "Review" || status === "Done" || status === "Rejected") && (
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
                                    <AlignLeft className="w-5 h-5 text-emerald-500" />
                                    <h3 className="text-sm font-bold uppercase tracking-wider">Submission Notes</h3>
                                </div>
                                <div className="bg-emerald-50/50 dark:bg-emerald-500/10 rounded-xl p-4 border border-emerald-200/50 dark:border-emerald-500/20">
                                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                                        {task.submissionNote || "No submission notes."}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Admin feedback for Review, Done, and Rejected */}
                        {(status === "Review" || status === "Done" || status === "Rejected") && (
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center justify-between text-slate-800 dark:text-slate-200">
                                    <div className="flex items-center gap-2">
                                        <User className="w-5 h-5 text-amber-500" />
                                        <h3 className="text-sm font-bold uppercase tracking-wider">Admin Feedback</h3>
                                    </div>
                                    {status === "Review" && (
                                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400">
                                            {task.status || "Pending Review"}
                                        </span>
                                    )}
                                </div>
                                {status === "Review" && (role === 'admin' || role === 'sub-admin') && (
                                    <textarea
                                        value={adminNote}
                                        onChange={(e) => setAdminNote(e.target.value)}
                                        placeholder="Write your review feedback here... (optional)"
                                        rows={3}
                                        className="w-full px-4 py-3 text-sm bg-amber-50/50 dark:bg-amber-500/5 border border-amber-200/50 dark:border-amber-500/20 rounded-xl outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/40 transition-all text-slate-700 dark:text-slate-300 font-medium placeholder:text-slate-400/60 dark:placeholder:text-slate-500 resize-none"
                                    />
                                )}
                                {
                                    (status === "Done" || status === "Rejected") && (
                                        <div className="bg-amber-50/50 dark:bg-amber-500/10 rounded-xl p-4 border border-amber-200/50 dark:border-amber-500/20">
                                            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                                                {task.adminNote || "No feedback from admin."}
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
                                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{project?.name || "N/A"}</span>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <User className="w-4 h-4 text-slate-400 mt-0.5" />
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-bold text-slate-500 uppercase">Assigned By</span>
                                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{assignedBy?.name || assignedBy}</span>
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
                                <Clock className="w-4 h-4 text-slate-400 mt-0.5" />
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-bold text-slate-500 uppercase">Status</span>
                                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{status}</span>
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
                <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex justify-end items-center gap-3">
                    <button
                        onClick={onClose}
                        className="px-5 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 text-sm font-semibold rounded-full transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                    >
                        {status === "In Progress" ? "Cancel" : "Close"}
                    </button>

                    {status === "Todo" && role === 'user' && (
                        <button
                            className="px-5 py-2.5 bg-sky-500/8 dark:bg-sky-500/15 hover:bg-sky-500/15 dark:hover:bg-sky-500/25 text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 rounded-full font-semibold text-sm border border-sky-500/30 dark:border-sky-500/40 hover:border-sky-500/50 dark:hover:border-sky-500/60 shadow-[0_2px_8px_rgba(14,165,233,0.08)] dark:shadow-[0_2px_12px_rgba(14,165,233,0.15)] active:scale-[0.97] transition-all duration-300 flex items-center gap-2 cursor-pointer"
                            onClick={() => {
                                handleUpdateStatus("in-progress");
                            }}
                        >
                            Add to Progress
                        </button>
                    )}

                    {(status === "In Progress" || status === "Rejected") && role === 'user' && (
                        <button
                            onClick={() => setIsReviewModalOpen(true)}
                            className="px-5 py-2.5 bg-sky-500/8 dark:bg-sky-500/15 hover:bg-sky-500/15 dark:hover:bg-sky-500/25 text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 rounded-full font-semibold text-sm border border-sky-500/30 dark:border-sky-500/40 hover:border-sky-500/50 dark:hover:border-sky-500/60 shadow-[0_2px_8px_rgba(14,165,233,0.08)] dark:shadow-[0_2px_12px_rgba(14,165,233,0.15)] active:scale-[0.97] transition-all duration-300 flex items-center gap-2 cursor-pointer"
                        >
                            <Send className="w-4 h-4" />
                            Send for Review
                        </button>
                    )}

                    {status === "Review" && (role === 'admin' || role === 'sub-admin') && (
                        <>
                            <button
                                onClick={() => handleUpdateStatus("rejected")}
                                className="px-5 py-2.5 bg-rose-500/8 dark:bg-rose-500/15 hover:bg-rose-500/15 dark:hover:bg-rose-500/25 text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 rounded-full font-semibold text-sm border border-rose-500/30 dark:border-rose-500/40 hover:border-rose-500/50 dark:hover:border-rose-500/60 shadow-[0_2px_8px_rgba(244,63,94,0.08)] dark:shadow-[0_2px_12px_rgba(244,63,94,0.15)] active:scale-[0.97] transition-all duration-300 flex items-center gap-2 cursor-pointer"
                            >
                                <X className="w-4 h-4" />
                                Reject
                            </button>
                            <button
                                onClick={() => handleUpdateStatus("approved")}
                                className="px-5 py-2.5 bg-emerald-500/8 dark:bg-emerald-500/15 hover:bg-emerald-500/15 dark:hover:bg-emerald-500/25 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 rounded-full font-semibold text-sm border border-emerald-500/30 dark:border-emerald-500/40 hover:border-emerald-500/50 dark:hover:border-emerald-500/60 shadow-[0_2px_8px_rgba(16,185,129,0.08)] dark:shadow-[0_2px_12px_rgba(16,185,129,0.15)] active:scale-[0.97] transition-all duration-300 flex items-center gap-2 cursor-pointer"
                            >
                                <CheckCircle2 className="w-4 h-4" />
                                Approve
                            </button>
                        </>
                    )}
                </div>
            </div>

            {isReviewModalOpen && (status === "In Progress" || status === "Rejected") && (
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
