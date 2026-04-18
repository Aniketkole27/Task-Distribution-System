import React from 'react';

function CalenderDay({ date, isCurrentMonth, isToday, events = [], onClick }) {
    return (
        <div
            onClick={() => isCurrentMonth && onClick(date)}
            className={`p-2 border-r border-b border-border h-full overflow-hidden ${!isCurrentMonth ? 'bg-muted/10 cursor-default grayscale opacity-50' : 'bg-card cursor-pointer transition-all hover:bg-muted/30 flex flex-col'}`}
        >
            {isCurrentMonth && (
                <>
                    <div className="flex items-center justify-between mb-1.5 px-1">
                        <span className={`text-xs font-bold w-6 h-6 flex items-center justify-center rounded-lg transition-colors ${isToday ? 'bg-stone-900 text-white shadow-md' : 'text-stone-400 group-hover:text-stone-900'}`}>
                            {date.getDate()}
                        </span>
                    </div>
                    <div className="flex-1 space-y-1 px-1 overflow-hidden">
                        {events.slice(0, 3).map((event, index) => (
                            <div
                                key={index}
                                className={`px-2 py-0.5 text-[9px] font-bold rounded-md truncate border border-black/5 ${event.color || 'bg-amber-500 text-white'}`}
                                title={`${event.title}${event.description ? ' - ' + event.description : ''}`}
                            >
                                {event.title}
                            </div>
                        ))}
                        {events.length > 3 && (
                            <div className="text-[9px] font-bold text-muted-foreground pl-1.5 pt-0.5">
                                + {events.length - 3} more
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default CalenderDay;
