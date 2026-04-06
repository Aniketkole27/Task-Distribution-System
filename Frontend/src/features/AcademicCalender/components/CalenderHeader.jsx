import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function CalenderHeader({ currentDate, onPrevMonth, onNextMonth, onToday }) {
    const monthName = currentDate.toLocaleString('default', { month: 'long' });
    const year = currentDate.getFullYear();

    return (
        <div className="sticky top-2 px-5 py-1 flex items-center justify-between mb-4 bg-white z-10">
            <div className="flex items-center space-x-4">
                <h2 className="text-2xl font-bold text-gray-800">{monthName} {year}</h2>
                <button
                    onClick={onToday}
                    className='border px-3 py-1 text-black rounded hover:bg-blue-100 hover:border-blue-500 active:bg-blue-200 active:text-blue-800 transition-colors text-sm'
                >
                    Today
                </button>
            </div>
            <div className="flex items-center space-x-2">
                <button
                    onClick={onPrevMonth}
                    className="p-2 text-gray-600 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <ChevronLeft size={20} />
                </button>
                <button
                    onClick={onNextMonth}
                    className="p-2 text-gray-600 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <ChevronRight size={20} />
                </button>
            </div>
        </div>
    );
}

export default CalenderHeader;
