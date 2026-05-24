import React, { useState, useEffect, useRef } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, X } from 'lucide-react';

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const CustomDatePicker = ({
  value, // "YYYY-MM-DD"
  onChange,
  name,
  placeholder = "Select due date",
  className = "",
  disabled = false,
  openDirection = "bottom",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Parse initial selected date
  const selectedDate = value ? new Date(value + 'T00:00:00') : null;

  // View state for month/year in the calendar
  const [viewMonth, setViewMonth] = useState(new Date().getMonth());
  const [viewYear, setViewYear] = useState(new Date().getFullYear());

  // Keep view in sync when a value is loaded
  useEffect(() => {
    if (selectedDate) {
      setViewMonth(selectedDate.getMonth());
      setViewYear(selectedDate.getFullYear());
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  const handleSelectDay = (day) => {
    if (disabled) return;
    const formattedMonth = String(viewMonth + 1).padStart(2, '0');
    const formattedDay = String(day).padStart(2, '0');
    const dateStr = `${viewYear}-${formattedMonth}-${formattedDay}`;

    onChange({
      target: {
        name,
        value: dateStr,
      },
    });
    setIsOpen(false);
  };

  // Generate calendar days
  const getDaysInMonth = (m, y) => new Date(y, m + 1, 0).getDate();
  const getFirstDayOfMonth = (m, y) => new Date(y, m, 1).getDay();

  const totalDays = getDaysInMonth(viewMonth, viewYear);
  const startDayIndex = getFirstDayOfMonth(viewMonth, viewYear);

  const daysArray = [];
  // Padding for start day
  for (let i = 0; i < startDayIndex; i++) {
    daysArray.push(null);
  }
  // Days of current month
  for (let i = 1; i <= totalDays; i++) {
    daysArray.push(i);
  }

  const formatDisplayDate = (date) => {
    if (!date) return "";
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const isToday = (day) => {
    const today = new Date();
    return today.getDate() === day && today.getMonth() === viewMonth && today.getFullYear() === viewYear;
  };

  const isSelected = (day) => {
    if (!selectedDate) return false;
    return selectedDate.getDate() === day && selectedDate.getMonth() === viewMonth && selectedDate.getFullYear() === viewYear;
  };

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-4 py-2.5 text-sm bg-background border border-border rounded-xl outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-foreground font-medium cursor-pointer ${
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        } ${isOpen ? 'ring-2 ring-blue-500/10 border-blue-500' : ''}`}
      >
        <div className="flex items-center gap-2.5 overflow-hidden">
          <CalendarIcon size={15} className="text-muted-foreground shrink-0" />
          {selectedDate ? (
            <span className="truncate text-foreground font-medium">{formatDisplayDate(selectedDate)}</span>
          ) : (
            <span className="text-muted-foreground/50 truncate font-normal">{placeholder}</span>
          )}
        </div>
      </button>

      {isOpen && (
        <div className={`absolute z-[110] w-[290px] bg-card border border-border rounded-2xl shadow-2xl p-4 animate-in fade-in duration-150 ${
          openDirection === 'top' 
            ? 'bottom-full mb-1.5 slide-in-from-bottom-2' 
            : 'top-full mt-1.5 slide-in-from-top-2'
        }`}>
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-extrabold text-foreground">
              {months[viewMonth]} {viewYear}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handlePrevMonth}
                className="p-1 hover:bg-muted rounded-lg text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={handleNextMonth}
                className="p-1 hover:bg-muted rounded-lg text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Weekday Names */}
          <div className="grid grid-cols-7 gap-1 text-center mb-1">
            {dayNames.map((name) => (
              <span key={name} className="text-[10px] font-bold text-muted-foreground/60 uppercase">
                {name}
              </span>
            ))}
          </div>

          {/* Calendar Grid Days */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {daysArray.map((day, idx) => {
              if (day === null) {
                return <span key={`pad-${idx}`} className="w-8 h-8" />;
              }

              const selected = isSelected(day);
              const today = isToday(day);

              return (
                <button
                  key={`day-${day}`}
                  type="button"
                  onClick={() => handleSelectDay(day)}
                  className={`w-8 h-8 text-xs font-bold rounded-lg flex items-center justify-center transition-all cursor-pointer ${
                    selected
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                      : today
                      ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20 font-extrabold'
                      : 'text-foreground/80 hover:bg-muted hover:text-foreground'
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDatePicker;
