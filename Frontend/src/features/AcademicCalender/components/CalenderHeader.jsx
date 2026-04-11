import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function CalenderHeader({ currentDate, onPrevMonth, onNextMonth, onToday }) {
    const monthName = currentDate.toLocaleString('default', { month: 'long' });
    const year = currentDate.getFullYear();

    return (
        <div className="mb-4 flex flex-col gap-3 rounded border border-stone-300 bg-stone-50 px-4 py-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
                <div>
                    <h2 className="text-xl font-semibold text-stone-900">{monthName} {year}</h2>
                    <p className="text-xs text-stone-500">Review the month and manage events day by day.</p>
                </div>
                <button
                    onClick={onToday}
                    className="rounded border border-stone-300 bg-white px-3 py-1.5 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-100"
                >
                    Today
                </button>
            </div>
            <div className="flex items-center gap-2 self-end md:self-auto">
                <button
                    onClick={onPrevMonth}
                    className="rounded border border-stone-300 bg-white p-2 text-stone-600 transition-colors hover:bg-stone-100 focus:outline-none"
                >
                    <ChevronLeft size={20} />
                </button>
                <button
                    onClick={onNextMonth}
                    className="rounded border border-stone-300 bg-white p-2 text-stone-600 transition-colors hover:bg-stone-100 focus:outline-none"
                >
                    <ChevronRight size={20} />
                </button>
            </div>
        </div>
    );
}

export default CalenderHeader;
