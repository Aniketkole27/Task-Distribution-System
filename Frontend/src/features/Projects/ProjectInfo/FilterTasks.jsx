import { Filter, Zap, ChevronDown, Clock, RotateCcw } from 'lucide-react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFilters, resetFilters } from '@/app/projectTaskSlice'
import CustomSelect from '@/shared/components/CustomSelect'

const FilterTasks = () => {
    const dispatch = useDispatch();
    const { filters, projectTasks } = useSelector(state => state.projectTask);
    const underReviewCount = projectTasks?.filter(task => task.status === 'under-review').length || 0;

    const handleFilterChange = (name, value) => {
        dispatch(setFilters({ [name]: value }));
    }

    return (
        <div className='mx-4 py-2  flex flex-wrap gap-6 items-center'>
            <SectionDropDown
                icon={<Filter size={14} className="text-blue-500" />}
                label="Status"
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                options={[
                    { label: "All Status", value: "all" },
                    { label: "Todo", value: "todo" },
                    { label: "In-Progress", value: "in-progress" },
                    // { label: "Submitted", value: "submitted" },
                    { label: "Under-Review", value: "under-review" },
                    { label: "Approved", value: "approved" },
                    { label: "Rejected", value: "rejected" }
                ]}
            />

            <SectionDropDown
                icon={<Zap size={14} className="text-amber-500" />}
                label="Priority"
                name="priority"
                value={filters.priority}
                onChange={handleFilterChange}
                options={[
                    { label: "All Priority", value: "all" },
                    { label: "Low", value: "low" },
                    { label: "Medium", value: "medium" },
                    { label: "Urgent", value: "urgent" }
                ]}
            />
            <div className='flex flex-col gap-1.5 min-w-[140px]'>
                <div className='flex items-center gap-2 px-1'>
                    <Clock size={14} className="text-rose-500" />
                    <label className='text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70'>Review Status</label>
                </div>
                <button
                    onClick={() => handleFilterChange('status', 'under-review')}
                    className='w-full flex items-center justify-between bg-background transition-all border border-border rounded-xl px-4 py-2.5 text-sm font-medium hover:border-blue-500/40 hover:shadow-sm focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none cursor-pointer text-left text-foreground'>
                    <span>Under Review</span>
                    {underReviewCount > 0 && (
                        <span className="bg-rose-100 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400 py-0.5 px-2 rounded-full text-[10px] font-bold">
                            {underReviewCount}
                        </span>
                    )}
                </button>
            </div>
            <button
                onClick={() => dispatch(resetFilters())}
                className='self-end flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-rose-500 hover:bg-rose-500/10 rounded-lg border border-border/40 hover:border-rose-500/20 transition-all group'
            >
                <RotateCcw size={12} className="group-hover:rotate-[-90deg] transition-transform duration-500" />
                Clear
            </button>
        </div>
    )
}

export default FilterTasks

const SectionDropDown = ({ options, label, icon, name, value, onChange }) => {
    const handleChange = (val) => {
        onChange(name, val);
    }

    return (
        <div className='flex flex-col gap-1.5 min-w-[140px]'>
            <div className='flex items-center gap-2 px-1'>
                {icon}
                <label className='text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70'>{label}</label>
            </div>
            <CustomSelect
                name={name}
                value={value}
                onChange={(e) => handleChange(e.target.value)}
                options={options}
                placeholder={`All ${label}`}
                openDirection="bottom"
            />
        </div>
    )
}
