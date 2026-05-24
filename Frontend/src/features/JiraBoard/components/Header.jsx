import { Search, Layout, User, Flag, X, SlidersHorizontal } from "lucide-react";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../../../app/jiraSlice";
import ShowProjectSidebar from "./ShowProjectSidebar";
import CustomSelect from "@/shared/components/CustomSelect";

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

    const projectOptions = [
        { value: '', label: 'All Projects' },
        ...uniqueProjects.map(p => ({ value: p, label: p }))
    ];

    const assigneeOptions = [
        { value: '', label: 'Assigned By' },
        ...uniqueAssignees.map(a => ({ value: a, label: a }))
    ];

    const priorityOptions = [
        { value: '', label: 'Any Priority' },
        ...uniquePriorities.map(p => ({
            value: p,
            label: p.charAt(0).toUpperCase() + p.slice(1),
            dotColor: p === 'urgent' ? 'bg-red-500' : p === 'medium' ? 'bg-amber-500' : 'bg-emerald-500'
        }))
    ];

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
                    <div className="h-6 w-px bg-border hidden sm:block shrink-0" />

                    {/* Project Filter */}
                    <div className="relative shrink-0 min-w-[160px]">
                        <CustomSelect
                            name="project"
                            value={filters.project}
                            onChange={(e) => handleFilterChange('project', e.target.value)}
                            options={projectOptions}
                            placeholder="All Projects"
                            icon={<Layout className="h-4 w-4 text-blue-500" />}
                            openDirection="bottom"
                            searchable={uniqueProjects.length > 5}
                        />
                    </div>

                    {/* Assigned By Filter */}
                    <div className="relative shrink-0 min-w-[155px]">
                        <CustomSelect
                            name="assignedBy"
                            value={filters.assignedBy}
                            onChange={(e) => handleFilterChange('assignedBy', e.target.value)}
                            options={assigneeOptions}
                            placeholder="Assigned By"
                            icon={<User className="h-4 w-4 text-violet-500" />}
                            openDirection="bottom"
                            searchable={uniqueAssignees.length > 5}
                        />
                    </div>

                    {/* Priority Filter */}
                    <div className="relative shrink-0 min-w-[145px]">
                        <CustomSelect
                            name="priority"
                            value={filters.priority}
                            onChange={(e) => handleFilterChange('priority', e.target.value)}
                            options={priorityOptions}
                            placeholder="Any Priority"
                            icon={<Flag className="h-4 w-4 text-amber-500" />}
                            openDirection="bottom"
                        />
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