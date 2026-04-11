import React, { useState } from 'react';
import Greeting from '@shared/components/Greeting';
import CalenderHeader from './components/CalenderHeader';
import CalenderGrid from './components/CalenderGrid';
import EventModal from './components/EventModal';

function AcademicCalender() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Events stored as dictionary with keys formatted as YYYY-MM-DD to values array of objects
  const [events, setEvents] = useState({});

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    console.log('Current Date:', currentDate);
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const  handleToday = () => {
    setCurrentDate(new Date());
  };

  // const handleToday = useCallback(() =>{
  //   setCurrentDate(new Date());
  // })

  const handleDayClick = (date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const formatDateKey = (date) => {
    if (!date) return '';
    return `${String(date.getFullYear())}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  const handleSaveEvent = (event) => {
    const key = formatDateKey(selectedDate);
    setEvents(prev => ({
      ...prev,
      [key]: [...(prev[key] || []), event]
    }));
  };

  const selectedDateKey = formatDateKey(selectedDate);
  const currentMonthLabel = currentDate.toLocaleDateString('default', {
    month: 'long',
    year: 'numeric',
  });
  const currentMonthEvents = Object.entries(events).reduce((count, [dateKey, dayEvents]) => {
    const eventDate = new Date(dateKey);
    const isSameMonth =
      eventDate.getFullYear() === currentDate.getFullYear() &&
      eventDate.getMonth() === currentDate.getMonth();

    return isSameMonth ? count + dayEvents.length : count;
  }, 0);

  return (
    <div className="bg-white text-black rounded-lg pb-3 shadow h-full flex flex-col">
      <div>
        <Greeting />
      </div>

      <div className="px-4 pb-4 flex flex-1 flex-col gap-4">
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded border border-stone-300 p-4 shadow">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-500">Academic Calendar</p>
            <h2 className="mt-2 text-2xl font-semibold text-stone-900">{currentMonthLabel}</h2>
            <p className="mt-1 text-sm text-stone-500">
              Track deadlines, events, and day-wise notes in one place.
            </p>
          </div>

          <div className="rounded border border-stone-300 p-4 shadow">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-500">This Month</p>
            <div className="mt-3 flex items-end justify-between gap-3">
              <div>
                <p className="text-3xl font-semibold text-stone-900">{currentMonthEvents}</p>
                <p className="text-sm text-stone-500">Scheduled items</p>
              </div>
              <p className="rounded bg-stone-100 px-3 py-1 text-xs font-medium text-stone-600">
                Click a day to add an event
              </p>
            </div>
          </div>
        </div>

        <div className="rounded border border-stone-300 p-4 shadow flex-1 flex flex-col min-h-175">
          <CalenderHeader
            currentDate={currentDate}
            onPrevMonth={handlePrevMonth}
            onNextMonth={handleNextMonth}
            onToday={handleToday}
          />

          <div className="flex-1 flex flex-col">
            <CalenderGrid
              currentDate={currentDate}
              events={events}
              onDayClick={handleDayClick}
            />
          </div>
        </div>
      </div>

      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedDate={selectedDate}
        events={events[selectedDateKey] || []}
        onSaveEvent={handleSaveEvent}
      />
    </div>
  );
}

export default AcademicCalender;
