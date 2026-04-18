import React from 'react'
import { Users, RocketIcon, Folder } from 'lucide-react'

const StatusCard = ({ totalMembers, totalProjects, totalActiveProjects }) => {
    return (
        <>
            <Card title={"Total Members"} value={totalMembers} icon={<Users size={16} />} />
            <Card title={"Total Projects"} value={totalProjects} icon={<Folder size={16} />} />
            <Card title={"Active Projects"} value={totalActiveProjects} icon={<RocketIcon size={16} />} />
        </>
    )
}

export default StatusCard


const Card = ({ title, value, icon: icon }) => {
    return (
        <div className='p-4 border rounded border-border shadow'>
            <div className='flex mb-3 items-start justify-between'>
                <div>
                    <h3 className='text-muted-foreground mb-2 text-sm'>{title}</h3>
                    <p className='text-2xl font-semibold'>{value}</p>
                </div>
                <span className='text-xs flex items-center gap-1 font-medium px-2 py-1 rounded bg-green-100'>
                    {icon}
                </span>
            </div>
        </div>
    )
}