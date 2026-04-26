import { CheckCircle2, Clock, FileText, AlertCircle } from "lucide-react";

const StatsCards = ({ statsData = { total: 0, completed: 0, inProgress: 0, overdue: 0 } }) => {
    const stats = [
        { title: "Total Tasks", value: statsData.total, icon: <FileText className="w-5 h-5 text-indigo-500" />, bg: "bg-indigo-50 dark:bg-indigo-500/10", border: "border-indigo-100 dark:border-indigo-500/20" },
        { title: "Completed", value: statsData.completed, icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />, bg: "bg-emerald-50 dark:bg-emerald-500/10", border: "border-emerald-100 dark:border-emerald-500/20" },
        { title: "In Progress", value: statsData.inProgress, icon: <Clock className="w-5 h-5 text-amber-500" />, bg: "bg-amber-50 dark:bg-amber-500/10", border: "border-amber-100 dark:border-amber-500/20" },
        { title: "Overdue", value: statsData.overdue, icon: <AlertCircle className="w-5 h-5 text-red-500" />, bg: "bg-red-50 dark:bg-red-500/10", border: "border-red-100 dark:border-red-500/20" },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            {stats.map((stat, index) => (
                <div key={index} className={`flex items-center p-4 rounded-xl border bg-white dark:bg-[#0f172a] shadow-sm hover:shadow-md transition-shadow duration-300 ${stat.border}`}>
                    <div className={`p-3 rounded-lg ${stat.bg} mr-4`}>
                        {stat.icon}
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.title}</p>
                        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">{stat.value}</h3>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StatsCards;
