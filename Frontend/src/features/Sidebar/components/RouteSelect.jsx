import React from 'react'
import { LayoutDashboard, UsersIcon, Settings, Calendar, ListCheck, Folder } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const RouteSelect = () => {
    return (
        <div className='space-y-1'>

            <RouteItems
                to={"/admin/dashboard"}
                title={"Dashboard"}
                icon={<LayoutDashboard size="16" />}
            />

            <RouteItems
                to={"/admin/projects"}
                title={"Projects"}
                icon={<Folder size="16" strokeWidth={2} />}
            />
            <RouteItems
                to={"/admin/team"}
                title={"Team"}
                icon={<UsersIcon size="16" />}
            />
            <RouteItems
                to="/admin/todos"
                title={"Todo's"}
                icon={<ListCheck size="16" />}
            />
            <RouteItems
                to="/admin/academic-calendar"
                title={"Academic Calender"}
                icon={<Calendar size="16" />}
            />

            <RouteItems
                to="/admin/settings"
                title={"Settings"}
                icon={<Settings size="16" />}
            />
        </div>
    )
}

export default RouteSelect

const RouteItems = ({ title, icon: icon, to }) => {

    return (
        <NavLink to={to}>
            {({ isActive }) => (
                <div
                    className={`flex items-center cursor-pointer gap-3 w-full rounded px-2 py-1.5 text-sm transition-all
                    ${isActive
                            ? "bg-card text-foreground shadow font-medium"
                            : "hover:bg-card/50 text-muted-foreground"
                        }`}
                >
                    <span className={isActive ? "text-foreground font-bold" : ""}>
                        {icon}
                    </span>
                    <span>{title}</span>
                </div>
            )}
        </NavLink>
    )
}