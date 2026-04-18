import React from 'react';

function CalenderDay({ date, isCurrentMonth, isToday, events = [], onClick }) {
    return (
        <div
            onClick={() => isCurrentMonth && onClick(date)}
            className={`p-2 border-r border-b border-gray-500 hover:shadow-2xl  min-h-40 overflow-hidden ${!isCurrentMonth ? 'bg-gray-50/50 cursor-default' : 'bg-background cursor-pointer transition-colors hover:bg-gray-50 flex flex-col'}`}
        >
            {isCurrentMonth && (
                <>
                    <div className="flex items-center justify-between mb-1">
                        <span className={`text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full ${isToday ? 'bg-blue-600 text-white' : 'text-gray-700'}`}>
                            {date.getDate()}
                        </span>
                    </div>
                    <div className="flex-1 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                        {events.map((event, index) => (
                            <div
                                key={index}
                                className={`px-2 py-1 text-xs rounded truncate ${event.color || 'bg-blue-100 text-blue-800'}`}
                                title={event.title}
                            >
                                {event.title}
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default CalenderDay;
