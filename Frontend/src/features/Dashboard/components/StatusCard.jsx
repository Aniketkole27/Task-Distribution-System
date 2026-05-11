import React from 'react'
import { Users, Rocket, Folder } from 'lucide-react'

const StatusCard = ({ totalMembers, totalProjects, totalActiveProjects }) => {
    return (
        <>
            <Card
                title={"Total Members"}
                value={totalMembers}
                icon={<Users size={16} />}
                color="text-indigo-500"
                bgColor="bg-indigo-500/10"
            />
            <Card
                title={"Total Projects"}
                value={totalProjects}
                icon={<Folder size={16} />}
                color="text-emerald-500"
                bgColor="bg-emerald-500/10"
            />
            <Card
                title={"Active Projects"}
                value={totalActiveProjects}
                icon={<Rocket size={16} />}
                color="text-amber-500"
                bgColor="bg-amber-500/10"
            />
        </>
    )
}

export default StatusCard

const Card = ({ title, value, icon, color, bgColor }) => {
    return (
        <div className="flex items-center gap-4 p-4 bg-card border border-border/50 rounded-xl shadow-sm transition-all hover:border-blue-500/30 group">
            <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${bgColor} ${color} transition-transform group-hover:scale-110`}>
                {icon}
            </div>
            <div className='flex flex-col'>
                <span className='text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60'>
                    {title}
                </span>
                <span className='text-xl font-extrabold tracking-tight text-foreground'>
                    {value}
                </span>
            </div>
        </div>
    )
}