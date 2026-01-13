import { Activity, ActivitySquare, AreaChart, FolderCheckIcon, LucideActivitySquare, ShieldCheck, UsersRoundIcon } from 'lucide-react'
import React from 'react'

const StatusCard = () => {
    return (
        <>
            <Card title={"Total Members"} value={30} icon={<UsersRoundIcon size={16} />} />
            <Card title={"Total Projects"} value={10} icon={<FolderCheckIcon size={16} />} />
            <Card title={"Active Projects"} value={5} icon={<ShieldCheck size={16} />} />
        </>
    )
}

export default StatusCard


const Card = ({ title, value, icon:icon }) => {
    return (
        <div className='p-4 border rounded border-stone-300 shadow'>
            <div className='flex mb-3 items-start justify-between'>
                <div>
                    <h3 className='text-stone-500 mb-2 text-sm'>{title}</h3>
                    <p className='text-2xl font-semibold'>{value}</p>
                </div>
                <span className='text-xs flex items-center gap-1 font-medium px-2 py-1 rounded bg-green-100'>
                    {icon}
                </span>
            </div>
        </div>
    )
}