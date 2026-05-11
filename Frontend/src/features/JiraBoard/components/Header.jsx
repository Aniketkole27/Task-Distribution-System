import { Search, Layout, User, Flag, ChevronDown, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import ShowProjectSidebar from "./ShowProjectSidebar";

const Header = () => {
    const [showProjectSidebar, setShowProjectSidebar] = useState(false)
    return (
        <div className="space-y-4">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4 w-full bg-card backdrop-blur-xl p-4 rounded-2xl border border-border shadow-sm transition-all duration-300 hover:shadow-md">
                {/* Search Bar */}
                <div className="relative w-full lg:max-w-md group">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-muted-foreground group-focus-within:text-blue-500 transition-colors" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search tasks, descriptions, or IDs..."
                        className="block w-full pl-10 pr-4 py-2.5 border border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 sm:text-sm transition-all duration-300"
                    />
                </div>

                {/* Filters */}
                <div className="flex items-center gap-3 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
                    {/* <div className="flex items-center gap-2 px-4 py-2.5 bg-muted rounded-xl border border-border text-sm font-bold text-muted-foreground shrink-0 uppercase tracking-wider">
                        <SlidersHorizontal className="w-4 h-4 text-blue-500" />
                        <span className="hidden sm:inline">Filters</span>
                    </div> */}

                    <div className="h-6 w-px bg-border hidden sm:block shrink-0" />

                    {/* Project Filter */}
                    <div className="relative shrink-0">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                            <Layout className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <select className="appearance-none block w-full pl-10 pr-10 py-2.5 border border-border rounded-xl bg-background text-foreground text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer transition-all duration-300 hover:border-blue-500/50">
                            <option value="">All Projects</option>
                            <option value="kalahvengam">Kalahvengam 2026</option>
                            <option value="admin">Department Admin</option>
                            <option value="academic">Academic Planning</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
                            <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        </div>
                    </div>

                    {/* Assigned By Filter */}
                    <div className="relative shrink-0">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                            <User className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <select className="appearance-none block w-full pl-10 pr-10 py-2.5 border border-border rounded-xl bg-background text-foreground text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer transition-all duration-300 hover:border-blue-500/50">
                            <option value="">Assigned By</option>
                            <option value="aniket">Aniket Kole</option>
                            <option value="ganesh">Ganesh Ekambe</option>
                            <option value="hod">HOD Computer Science</option>
                            <option value="principal">Principal</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
                            <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        </div>
                    </div>

                    {/* Priority Filter */}
                    <div className="relative shrink-0">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                            <Flag className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <select className="appearance-none block w-full pl-10 pr-10 py-2.5 border border-border rounded-xl bg-background text-foreground text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer transition-all duration-300 hover:border-blue-500/50">
                            <option value="">Any Priority</option>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
                            <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-2">
                <button
                    onClick={() => setShowProjectSidebar(true)}
                    className="text-xs font-bold text-muted-foreground hover:text-blue-500 transition-colors flex items-center gap-2 uppercase tracking-widest"
                >
                    <Layout size={14} className="text-blue-500" />
                    Total projects you are working on: <span className="text-foreground text-sm">3</span>
                </button>
            </div>

            {showProjectSidebar && (
                <ShowProjectSidebar
                    showProjectSidebar={showProjectSidebar}
                    setShowProjectSidebar={setShowProjectSidebar}
                />
            )}
        </div>
    )
}

export default Header