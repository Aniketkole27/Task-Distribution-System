import React from 'react'
import { useSelector } from 'react-redux';

const AccountName = () => {
    const profile = useSelector(state => state.currentUser.profile);
    return (
        <div className='border-b mb-4 mt-2 pb-4 border-border/50'>
            <button className='flex p-0.5 hover:bg-card/50 rounded-lg transition-colors relative gap-3 w-full px-2 py-1.5 items-center cursor-pointer group'>
                <img src="/react.svg" alt="" className='size-9 rounded-lg shrink-0 bg-primary/10 p-1.5 shadow-sm border border-primary/20' />
                <div className='text-start'>
                    <span className='text-sm font-bold block text-foreground leading-none mb-1'>{profile?.name}</span>
                    <span className='text-[11px] text-muted-foreground block leading-none'>{profile?.email}</span>
                </div>
            </button>
        </div>
    )
}

export default AccountName
