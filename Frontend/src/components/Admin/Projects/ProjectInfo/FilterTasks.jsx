import { Droplet } from 'lucide-react'
import React from 'react'

const FilterTasks = () => {

    return (
        <div className='mx-4 flex gap-5'>
            <SectionDropDown options={[
                { label: "All Task", value: "", disable: false },
                { label: "Completed", value: "completed", disable: false },
                { label: "In-progress", value: "in-progress", disable: false },
                { label: "Review", value: "review", disable: false }
            ]} label="Status" />

            <SectionDropDown options={[
                { label: "Priority", value: "", disable: false },
                { label: "Low", value: "low", disable: false },
                { label: "Medium", value: "medium", disable: false },
                { label: "High", value: "high", disable: false }
            ]} label="Priority set" />

        </div>
    )
}

export default FilterTasks


const SectionDropDown = ({ options, label }) => {
    return (
        <div>
            <label className='block text-xs p-0.5'>{label}</label>
            <select
                className={`border w-full flex cursor-pointer border-stone-300 shadow px-2 py-0.5 rounded font-semibold outline-none`}>
                {options.map((option) => (
                    <option  disabled={option.disable} key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    )
}
