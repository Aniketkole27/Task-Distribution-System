import { Search, Layout, User, Flag, ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../../../app/jiraSlice";
import ShowProjectSidebar from "./ShowProjectSidebar";

const Header = () => {
    const [showProjectSidebar, setShowProjectSidebar] = useState(false);
    const [isSearchExpanded, setIsSearchExpanded] = useState(false);
    const searchInputRef = useRef(null);
    const dispatch = useDispatch();
    const { tasks, filters } = useSelector((state) => state.jira);

    const uniqueProjects = Array.from(new Set(tasks.map(t => t.project?.name).filter(Boolean)));
    const uniqueAssignees = Array.from(new Set(tasks.map(t => t.assignedBy?.name || (typeof t.assignedBy === 'string' ? t.assignedBy : null)).filter(Boolean)));
    const uniquePriorities = Array.from(new Set(tasks.map(t => t.priority).filter(Boolean)));

    const handleFilterChange = (field, value) => {
        dispatch(setFilters({ [field]: value }));
    };
    const hasActiveFilters = filters.search || filters.project || filters.assignedBy || filters.priority;

    const handleClearFilters = () => {
        dispatch(setFilters({ search: '', project: '', assignedBy: '', priority: '' }));
        setIsSearchExpanded(false);
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4 w-full bg-card backdrop-blur-xl p-4 rounded-2xl border border-border shadow-sm transition-all duration-300 hover:shadow-md">
                {/* Search Bar */}
                <div className={`relative transition-all duration-300 ease-in-out group ${isSearchExpanded || filters.search ? 'w-full lg:max-w-md' : 'w-10 h-10'}`}>
                    <button 
                        onClick={() => {
                            setIsSearchExpanded(true);
                            setTimeout(() => searchInputRef.current?.focus(), 50);
                        }}
                        className={`absolute inset-y-0 left-0 flex items-center justify-center w-10 h-10 transition-colors z-10 rounded-xl ${isSearchExpanded || filters.search ? 'pointer-events-none text-blue-500' : 'text-muted-foreground hover:bg-muted border border-border cursor-pointer'}`}
                    >
                        <Search className="h-4 w-4" />
                    </button>
                    <input
                        ref={searchInputRef}
                        type="text"
                        placeholder="Search tasks, descriptions, or IDs..."
                        value={filters.search}
                        onChange={(e) => handleFilterChange('search', e.target.value)}
                        onFocus={() => setIsSearchExpanded(true)}
                        onBlur={() => {
                            if (!filters.search) setIsSearchExpanded(false);
                        }}
                        className={`block w-full h-10 border border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 sm:text-sm transition-all duration-300 ${isSearchExpanded || filters.search ? 'pl-10 pr-4 opacity-100' : 'pl-0 pr-0 opacity-0 pointer-events-none'}`}
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
                        <select 
                            value={filters.project}
                            onChange={(e) => handleFilterChange('project', e.target.value)}
                            className="appearance-none block w-full pl-10 pr-10 py-2.5 border border-border rounded-xl bg-background text-foreground text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer transition-all duration-300 hover:border-blue-500/50"
                        >
                            <option value="">All Projects</option>
                            {uniqueProjects.map(project => (
                                <option key={project} value={project}>{project}</option>
                            ))}
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
                        <select 
                            value={filters.assignedBy}
                            onChange={(e) => handleFilterChange('assignedBy', e.target.value)}
                            className="appearance-none block w-full pl-10 pr-10 py-2.5 border border-border rounded-xl bg-background text-foreground text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer transition-all duration-300 hover:border-blue-500/50"
                        >
                            <option value="">Assigned By</option>
                            {uniqueAssignees.map(assignee => (
                                <option key={assignee} value={assignee}>{assignee}</option>
                            ))}
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
                        <select 
                            value={filters.priority}
                            onChange={(e) => handleFilterChange('priority', e.target.value)}
                            className="appearance-none block w-full pl-10 pr-10 py-2.5 border border-border rounded-xl bg-background text-foreground text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer transition-all duration-300 hover:border-blue-500/50"
                        >
                            <option value="">Any Priority</option>
                            {uniquePriorities.map(priority => (
                                <option key={priority} value={priority}>{priority}</option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
                            <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        </div>
                    </div>

                    {/* Clear Filters Button */}
                    {hasActiveFilters && (
                        <button
                            onClick={handleClearFilters}
                            className="flex items-center justify-center gap-1.5 px-3 h-10 text-xs font-bold text-rose-500 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 rounded-xl transition-all duration-300 shrink-0 uppercase tracking-widest"
                        >
                            <X className="h-3.5 w-3.5" />
                            <span className="hidden sm:inline">Clear</span>
                        </button>
                    )}
                </div>
            </div>

            <div className="px-2">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setShowProjectSidebar(true);
                    }}
                    className="text-xs font-bold text-muted-foreground hover:text-blue-500 transition-colors flex items-center gap-2 uppercase tracking-widest"
                >
                    <Layout size={14} className="text-blue-500" />
                    Total projects you are working on: <span className="text-foreground text-sm">{uniqueProjects.length}</span>
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