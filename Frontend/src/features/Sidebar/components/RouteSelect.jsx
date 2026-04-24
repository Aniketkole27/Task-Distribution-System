import React from 'react'
import { LayoutDashboard, UsersIcon, Settings, Calendar, ListCheck, Folder } from 'lucide-react'
import { NavLink } from 'react-router-dom'

import { useSelector } from 'react-redux'

const RouteSelect = () => {
    const userProfile = useSelector((state) => state.currentUser.profile)
    const role = userProfile?.role

    const getBasePath = () => {
        if (role === 'admin') return '/admin'
        if (role === 'sub-admin') return '/manager'
        return '/user'
    }

    const basePath = getBasePath()

    return (
        <div className='space-y-1'>
            <RouteItems
                to={`${basePath}/dashboard`}
                title={"Dashboard"}
                icon={<LayoutDashboard size="16" />}
            />

            <RouteItems
                to={`${basePath}/projects`}
                title={"Projects"}
                icon={<Folder size="16" strokeWidth={2} />}
            />

            {(role === 'admin' || role === 'sub-admin') && (
                <RouteItems
                    to={`${basePath}/team`}
                    title={"Team"}
                    icon={<UsersIcon size="16" />}
                />
            )}

            <RouteItems
                to={`${basePath}/todos`}
                title={"Todo's"}
                icon={<ListCheck size="16" />}
            />

            {(role === 'admin' || role === 'sub-admin') && (
                <RouteItems
                    to={`${basePath}/academic-calendar`}
                    title={"Academic Calender"}
                    icon={<Calendar size="16" />}
                />
            )}

            <RouteItems
                to={`${basePath}/settings`}
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
                    className={`flex items-center cursor-pointer gap-3 w-full rounded-xl px-3 py-2 text-sm transition-all duration-200 group
                    ${isActive
                            ? "bg-white text-primary shadow-sm border-border/50 font-bold"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                >
                    <span className={isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground transition-colors"}>
                        {icon}
                    </span>
                    <span>{title}</span>
                </div>
            )}
        </NavLink>
    )
}