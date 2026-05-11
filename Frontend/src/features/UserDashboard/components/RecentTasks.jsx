import { CheckCircle2, Clock, ArrowRight } from "lucide-react";

const RecentTasks = ({ tasks = [] }) => {
    // Helper function to format the due date
    const formatDate = (dateString) => {
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm w-full lg:w-2/3">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-lg font-bold text-foreground mb-1 tracking-tight">Recent Activity</h3>
                    <p className="text-sm text-muted-foreground">Your latest task updates</p>
                </div>
                <button className="text-sm font-bold text-blue-500 hover:text-blue-600 flex items-center gap-1 transition-colors group">
                    View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>

            <div className="space-y-3">
                {tasks.length > 0 ? (
                    tasks.map((task) => (
                        <div key={task.id} className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-muted/30 hover:bg-muted/50 transition-all group">
                            <div className="flex items-center gap-4">
                                {task.status === "Done" ? (
                                    <div className="p-2 bg-emerald-500/10 rounded-lg">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                    </div>
                                ) : (
                                    <div className="p-2 bg-amber-500/10 rounded-lg">
                                        <Clock className="w-5 h-5 text-amber-500" />
                                    </div>
                                )}
                                <div>
                                    <h4 className="text-sm font-bold text-foreground group-hover:text-blue-500 transition-colors">{task.title}</h4>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <span className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">#{task.id}</span>
                                        <span className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">• {task.projectName}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${task.status === 'Done' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-amber-500/10 text-amber-500 border-amber-500/20'}`}>
                                    {task.status}
                                </span>
                                <span className="text-[10px] font-bold text-muted-foreground/60 mt-2">Due {formatDate(task.dueDate)}</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center bg-muted/20 rounded-xl border border-dashed border-border/50">
                        <Clock className="w-10 h-10 text-muted-foreground/30 mb-3" />
                        <p className="text-sm font-medium text-muted-foreground">No recent activity found</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecentTasks;
