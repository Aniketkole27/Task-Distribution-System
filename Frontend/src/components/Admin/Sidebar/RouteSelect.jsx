import React, { useState } from 'react'
import { LayoutDashboard, UsersIcon, Settings, Calendar, ListCheck, Folder } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { setCurrentTab } from '../app/currentTabSlice'

const RouteSelect = () => {
    const [isSelected, setIsSelected] = useState("dashboard")
    return (
        <div className='space-y-1'>
            <Route
                title={"Dashboard"}
                icon={<LayoutDashboard size="16" />}
                selected={"dashboard" === isSelected}
                setIsSelected={setIsSelected}
            />
            <Route
                title={"Projects"}
                icon={<Folder size="16" strokeWidth={2} />}
                selected={"projects" === isSelected}
                setIsSelected={setIsSelected}
            />
            <Route
                title={"Team"}
                icon={<UsersIcon size="16" />}
                selected={"team" === isSelected}
                setIsSelected={setIsSelected}
            />
            <Route
                title={"Todo's"}
                icon={<ListCheck size="16" />}
                selected={"todo's" === isSelected}
                setIsSelected={setIsSelected}
            />
            <Route
                title={"Academic Calender"}
                icon={<Calendar size="16" />}
                selected={"academic calender" === isSelected}
                setIsSelected={setIsSelected}
            />
            <Route
                title={"Settings"}
                icon={<Settings size="16" />}
                selected={"settings" === isSelected}
                setIsSelected={setIsSelected}
            />
        </div>
    )
}

export default RouteSelect

const Route = ({ title, selected, setIsSelected, icon: icon }) => {
    const dispatch = useDispatch()

    const handleSelect = ()=>{
        setIsSelected(title.toLowerCase())
        dispatch(setCurrentTab(title.toLowerCase()))

    }
    return (
        <button
            onClick={handleSelect}
            className={`flex items-center cursor-pointer justify-start gap-3 w-full rounded px-2 py-1.5 text-sm transition-[box-shadow_background-color_color]
             ${selected ? "bg-white text-stone-950 shadow font-medium" : "hover:bg-stone-200 bg-transparent text-stone-500 shadow-none"}`}>
            <span className={` ${selected ? "text-black font-bold shadow-xl" :""}`}>{icon}</span>
            <span>{title}</span>
        </button>
    )
}