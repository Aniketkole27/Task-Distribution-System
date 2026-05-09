import React, { useEffect, useState } from 'react'
import ThemeToggle from './ToggleTheme'
import { useSelector } from 'react-redux'

const Greeting = () => {
    const hours = new Date().getHours()
    let greet;
    let date = `${new Date().toLocaleDateString('en-US', {
        weekday: "long",
        day: "numeric",
        month: "short",
        year: "numeric"
    })}`

    const profile = useSelector(state => state.currentUser.profile);

    if (hours < 12) greet = "Good Morning"
    else if (hours < 18) greet = "Good Afternoon"
    else greet = "Good Night"

    return (
        <main className='w-full px-6 py-4 bg-card border border-border rounded-xl shadow-sm'>
            <div className='flex p-1 items-center justify-between'>
                <div className='flex flex-col gap-1'>
                    <span className='block text-sm font-bold'>
                        {
                            profile?.name ? (
                                `${greet}, ${profile.name}`
                            ) : (
                                <div className="h-4 w-40 bg-muted rounded animate-pulse"></div>
                            )
                        }
                    </span>
                    <span className='block text-xs text-muted-foreground'>{date}</span>
                </div>
                <div>
                    <ThemeToggle />
                </div>
            </div>
        </main>
    )
}

export default Greeting


