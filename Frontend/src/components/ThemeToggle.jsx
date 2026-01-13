import React, { use, useState } from 'react'

const ThemeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(false)
    const handleToggle = () => {
        if (isDarkMode) {
            document.documentElement.classList.remove("dark");
            setIsDarkMode(!isDarkMode)
        } else {
            document.documentElement.classList.add("dark");
            setIsDarkMode(!isDarkMode)
        }
    }
    return (
        <button onClick={handleToggle} className='px-2 py-1 text-sm text-black rounded focus:outline-none hover:text-violet-500 hover:bg-violet-200 cursor-pointer transition-colors duration-300 bg-stone-200'>
            Theme
        </button>
    )
}

export default ThemeToggle
