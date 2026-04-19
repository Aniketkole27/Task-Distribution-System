import React from 'react'
import { Users, Rocket, Folder, ArrowUpRight, CheckCircle2 } from 'lucide-react'

const StatusCard = ({ totalMembers, totalProjects, totalActiveProjects }) => {
    return (
        <>
            <Card
                title={"Total Members"}
                value={totalMembers}
                icon={<Users size={20} />}
                color="text-indigo-600"
                bgColor="bg-indigo-50"
                borderColor="border-indigo-100"
            />
            <Card
                title={"Total Projects"}
                value={totalProjects}
                icon={<Folder size={20} />}
                color="text-emerald-600"
                bgColor="bg-emerald-50"
                borderColor="border-emerald-100"
            />
            <Card
                title={"Active Projects"}
                value={totalActiveProjects}
                icon={<Rocket size={20} />}
                color="text-amber-600"
                bgColor="bg-amber-50"
                borderColor="border-amber-100"
            />
        </>
    )
}

export default StatusCard

const Card = ({ title, value, icon, color, bgColor, borderColor }) => {
    return (
        <div className={`p-6 bg-card border ${borderColor} rounded-2xl shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 group overflow-hidden relative`}>
            <div className='flex items-start justify-between relative z-10'>
                <div className='space-y-4'>
                    <div className={`p-3 rounded-xl ${bgColor} ${color} w-fit shadow-inner`}>
                        {icon}
                    </div>
                    <div>
                        <h3 className='text-muted-foreground font-medium text-xs uppercase tracking-wider mb-1'>{title}</h3>
                        <div className='flex items-baseline gap-2'>
                            <p className='text-3xl font-bold tracking-tight text-foreground'>{value}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Soft decorative background shape */}
            <div className={`absolute -right-4 -bottom-4 w-24 h-24 rounded-full ${bgColor} opacity-20 blur-2xl group-hover:opacity-30 transition-opacity`} />
        </div>
    )
}