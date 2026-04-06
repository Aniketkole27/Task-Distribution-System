import React from 'react';
import CalenderDay from './CalenderDay';

function CalenderGrid({ currentDate, events, onDayClick }) {
    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (year, month) => {
        return new Date(year, month, 1).getDay();
    };

    const generateDays = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        const daysInMonth = getDaysInMonth(year, month);
        const firstDayIndex = getFirstDayOfMonth(year, month);

        const daysInPrevMonth = getDaysInMonth(year, month - 1);

        const days = [];

        // Previous month's trailing days
        for (let i = firstDayIndex - 1; i >= 0; i--) {
            const date = new Date(year, month - 1, daysInPrevMonth - i);
            days.push({
                date,
                isCurrentMonth: false,
            });
        }

        // Current month's days
        for (let i = 1; i <= daysInMonth; i++) {
            const date = new Date(year, month, i);
            days.push({
                date,
                isCurrentMonth: true,
            });
        }

        // Next month's leading days to fill grid (usually 42 cells for 6 rows)
        const remainingCells = 42 - days.length;
        for (let i = 1; i <= remainingCells; i++) {
            const date = new Date(year, month + 1, i);
            days.push({
                date,
                isCurrentMonth: false,
            });
        }

        return days;
    };

    const days = generateDays();
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Check if a given date is today
    const isToday = (date) => {
        const today = new Date();
        return date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();
    };

    const formatDateKey = (date) => {
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    };

    return (
        <div className="bg-white border border-gray-500 rounded-lg overflow-hidden shadow-2xs h-full flex flex-col">
            <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50 shrink-0">
                {weekDays.map((day) => (
                    <div key={day} className="py-2 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider border-r border-gray-200 last:border-r-0">
                        {day}
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-7 flex-1 auto-rows-[1fr]">
                {days.map((dayObj, index) => {
                    const dateKey = formatDateKey(dayObj.date);
                    const dayEvents = events[dateKey] || [];

                    return (
                        <CalenderDay
                            key={index}
                            date={dayObj.date}
                            isCurrentMonth={dayObj.isCurrentMonth}
                            isToday={isToday(dayObj.date)}
                            events={dayEvents}
                            onClick={onDayClick}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default CalenderGrid;
