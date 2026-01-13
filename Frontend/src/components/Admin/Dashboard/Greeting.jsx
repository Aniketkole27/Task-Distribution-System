import React, { useEffect } from 'react'
import ThemeToggle from '../../ThemeToggle'

const Greeting = () => {
    let time = Date()
    return (
        <main className='border-b px-4 mb-4 mt-2 pb-4 border-stone-300'>
            <div className='flex p-0.5 items-center justify-between'>
                <div>
                    <span className='block text-sm font-bold'>Good Morning, Aniket</span>
                    <span className='block text-xs text-stone-500'>{time}</span>
                </div>
                <ThemeToggle />
                
                {/* <button className='px-2 py-1 text-sm text-black rounded focus:outline-none hover:text-violet-500 hover:bg-violet-200 cursor-pointer transition-colors duration-300 bg-stone-200'>
                    Theme
                </button> */}
            </div>
        </main>
    )
}

export default Greeting
