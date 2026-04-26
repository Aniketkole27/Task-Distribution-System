import { CheckCircle2, Clock, ArrowRight } from "lucide-react";

const RecentTasks = ({ tasks = [] }) => {
    // Helper function to format the due date
    const formatDate = (dateString) => {
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm w-full lg:w-2/3">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-1">Recent Activity</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Your latest task updates</p>
                </div>
                <button className="text-sm font-medium text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1 transition-colors">
                    View All <ArrowRight className="w-4 h-4" />
                </button>
            </div>

            <div className="space-y-4">
                {tasks.length > 0 ? (
                    tasks.map((task) => (
                        <div key={task.id} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-900/20 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                            <div className="flex items-center gap-3">
                                {task.status === "Done" ? (
                                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                ) : (
                                    <Clock className="w-5 h-5 text-amber-500" />
                                )}
                                <div>
                                    <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">{task.title}</h4>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500">#{task.id}</span>
                                        <span className="text-[10px] text-slate-400 dark:text-slate-500">• {task.projectName}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${task.status === 'Done' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400' : 'bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400'}`}>
                                    {task.status}
                                </span>
                                <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">Due {formatDate(task.dueDate)}</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-8 text-sm text-slate-500 dark:text-slate-400">
                        No recent activity found.
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecentTasks;
