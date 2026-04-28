import { X, Send } from "lucide-react";
import { useState } from "react";

const ReviewSubmissionModal = ({ task, onClose, onSubmit }) => {
    const [description, setDescription] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here we would typically make an API call
        if (onSubmit) {
            onSubmit(description);
        }
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6" onClick={onClose}>
            <div
                className="relative w-full max-w-lg bg-white dark:bg-[#0f172a] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header Pattern / Accent */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500" />

                {/* Header Actions */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-500/20">
                            <Send className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Send for Review</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        type="button"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col">
                    {/* Content */}
                    <div className="p-6 flex flex-col gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="review-description" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                What did you complete?
                            </label>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                Provide a brief summary of the work done for task <span className="font-bold text-slate-700 dark:text-slate-300">{task?.id || 'TSK-000'}</span>.
                            </p>
                        </div>
                        <textarea
                            id="review-description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="I have completed the responsive design and tested it across modern browsers..."
                            className="w-full min-h-[120px] p-3 text-sm text-slate-800 dark:text-slate-100 bg-slate-50 dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 resize-y transition-shadow placeholder:text-slate-400 dark:placeholder:text-slate-500"
                            required
                        />
                    </div>

                    {/* Footer */}
                    <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm font-bold rounded-lg transition-colors shadow-sm"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-bold rounded-lg transition-colors shadow-sm flex items-center gap-2"
                        >
                            <Send className="w-4 h-4" />
                            Submit Review
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReviewSubmissionModal;
