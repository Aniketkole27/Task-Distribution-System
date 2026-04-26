import { Search, Layout, User, Flag, ChevronDown, SlidersHorizontal } from "lucide-react";

const Header = () => {
    return (
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 w-full bg-white/50 dark:bg-[#0f172a]/50 backdrop-blur-xl p-4 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 shadow-sm transition-all duration-300 hover:shadow-md">

            {/* Search Bar */}
            <div className="relative w-full lg:max-w-md group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                </div>
                <input
                    type="text"
                    placeholder="Search tasks, descriptions, or IDs..."
                    className="block w-full pl-10 pr-4 py-2.5 border border-slate-200 dark:border-slate-700/50 rounded-xl leading-5 bg-white dark:bg-slate-900/50 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 sm:text-sm transition-all duration-300 shadow-sm"
                />
            </div>

            {/* Filters */}
            <div className="flex items-center gap-3 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0" style={{ scrollbarWidth: 'none' }}>
                <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200/50 dark:border-slate-700/50 text-sm font-semibold text-slate-600 dark:text-slate-300 shrink-0">
                    <SlidersHorizontal className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                    <span className="hidden sm:inline">Filters</span>
                </div>

                <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block shrink-0" />

                {/* Project Filter */}
                <div className="relative shrink-0">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <Layout className="h-4 w-4 text-slate-400" />
                    </div>
                    <select className="appearance-none block w-full pl-10 pr-10 py-2.5 border border-slate-200 dark:border-slate-700/50 rounded-xl bg-white dark:bg-slate-900/50 text-slate-700 dark:text-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/50 cursor-pointer transition-all duration-300 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm">
                        <option value="">All Projects</option>
                        <option value="kalahvengam">Kalahvengam 2026</option>
                        <option value="admin">Department Admin</option>
                        <option value="academic">Academic Planning</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
                        <ChevronDown className="h-4 w-4 text-slate-400" />
                    </div>
                </div>

                {/* Assigned By Filter */}
                <div className="relative shrink-0">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <User className="h-4 w-4 text-slate-400" />
                    </div>
                    <select className="appearance-none block w-full pl-10 pr-10 py-2.5 border border-slate-200 dark:border-slate-700/50 rounded-xl bg-white dark:bg-slate-900/50 text-slate-700 dark:text-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/50 cursor-pointer transition-all duration-300 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm">
                        <option value="">Assigned By</option>
                        <option value="aniket">Aniket Kole</option>
                        <option value="ganesh">Ganesh Ekambe</option>
                        <option value="hod">HOD Computer Science</option>
                        <option value="principal">Principal</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
                        <ChevronDown className="h-4 w-4 text-slate-400" />
                    </div>
                </div>

                {/* Priority Filter */}
                <div className="relative shrink-0">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <Flag className="h-4 w-4 text-slate-400" />
                    </div>
                    <select className="appearance-none block w-full pl-10 pr-10 py-2.5 border border-slate-200 dark:border-slate-700/50 rounded-xl bg-white dark:bg-slate-900/50 text-slate-700 dark:text-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/50 cursor-pointer transition-all duration-300 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm">
                        <option value="">Any Priority</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
                        <ChevronDown className="h-4 w-4 text-slate-400" />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Header