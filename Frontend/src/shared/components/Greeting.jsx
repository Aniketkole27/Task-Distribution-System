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
        <main className='border-b px-4 mb-4 mt-1 pb-4 border-stone-300'>
            <div className='flex p-0.5 items-center justify-between'>
                <div>
                    <span className='block text-sm font-bold'>
                        {
                            profile?.name ? (
                                `${greet}, ${profile.name}`
                            ) : (
                                <div className="h-4 w-40 bg-gray-300 rounded animate-pulse"></div>
                            )
                        }
                    </span>
                    <span className='block text-xs text-stone-500'>{date}</span>
                </div>
                <ThemeToggle />
            </div>
        </main>
    )
}

export default Greeting


