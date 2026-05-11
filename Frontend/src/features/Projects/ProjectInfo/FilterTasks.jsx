import { Filter, Zap, ChevronDown } from 'lucide-react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFilters } from '@/app/projectTaskSlice'

const FilterTasks = () => {
    const dispatch = useDispatch();
    const filters = useSelector(state => state.projectTask.filters);

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
                    { label: "Submitted", value: "submitted" },
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
        </div>
    )
}

export default FilterTasks

const SectionDropDown = ({ options, label, icon, name, value, onChange }) => {
    return (
        <div className='flex flex-col gap-1.5 min-w-[140px]'>
            <div className='flex items-center gap-2 px-1'>
                {icon}
                <label className='text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70'>{label}</label>
            </div>
            <div className='relative group'>
                <select
                    value={value}
                    onChange={(e) => onChange(name, e.target.value)}
                    className='appearance-none w-full bg-card transition-all border border-border/60 rounded-lg px-3 py-1.5 text-xs font-semibold focus:ring-2 focus:ring-blue-500/10 focus:border-blue-400 outline-none cursor-pointer shadow-sm'>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <div className='absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground/50 group-hover:text-foreground/70 transition-colors'>
                    <ChevronDown size={12} />
                </div>
            </div>
        </div>
    )
}

