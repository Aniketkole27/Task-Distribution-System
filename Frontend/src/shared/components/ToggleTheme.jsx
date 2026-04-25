import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle = () => {
    const [isDark, setIsDark] = useState(() => {
        const saved = localStorage.getItem('theme');
        if (saved) return saved === 'dark';
        return false;
    });

    useEffect(() => {
        const root = document.documentElement;
        if (isDark) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);

    return (
        <button
            onClick={() => setIsDark(!isDark)}
            className="group relative flex items-center justify-center w-9 h-9 rounded-lg bg-muted hover:bg-border transition-all duration-300 cursor-pointer"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
            <div className="relative flex items-center justify-center w-5 h-5">
                {isDark ? (
                    <Moon className="w-4 h-4 text-blue-500" />
                ) : (
                    <Sun className="w-4 h-4 text-amber-500" />
                )}
            </div>
        </button>
    );
};

export default ThemeToggle;
