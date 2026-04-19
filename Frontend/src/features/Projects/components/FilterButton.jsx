import { Filter, ChevronDown, Check } from 'lucide-react'
import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelected } from "@app/projectDataSlice"

const FilterButton = () => {
    const dispatch = useDispatch()
    const selectedFilter = useSelector(state => state.projectData.selected)
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef(null)

    const options = [
        { label: "All Status", value: "all" },
        { label: "Completed", value: "completed" },
        { label: "Active", value: "active" },
        { label: "Failed", value: "failed" },
    ]

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleSelect = (value) => {
        dispatch(setSelected(value))
        setIsOpen(false)
    }

    const currentLabel = options.find(opt => opt.value === selectedFilter)?.label || "All Status"

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2.5 px-3.5 py-2 rounded-xl border transition-all duration-200 select-none
                ${isOpen 
                    ? "bg-muted border-primary/30 shadow-sm ring-4 ring-primary/5" 
                    : "bg-muted/30 border-border hover:bg-muted/50"}`}
            >
                <Filter size={14} className={isOpen ? "text-primary" : "text-muted-foreground"} />
                <span className="text-sm font-semibold text-foreground tracking-tight whitespace-nowrap">
                    {currentLabel}
                </span>
                <ChevronDown size={14} className={`text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-card border border-border rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-left">
                    <div className="p-1.5">
                        {options.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => handleSelect(option.value)}
                                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors
                                ${selectedFilter === option.value 
                                    ? "bg-primary/10 text-primary" 
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
                            >
                                {option.label}
                                {selectedFilter === option.value && <Check size={14} />}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default FilterButton

