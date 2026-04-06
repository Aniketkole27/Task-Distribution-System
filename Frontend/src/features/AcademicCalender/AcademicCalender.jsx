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
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

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

  return (
    <div className="p-6 w-full min-h-screen flex flex-col">
      <div className="">
        <Greeting />
        {/* <p className="text-gray-500 mt-1">Manage your academic schedule and view upcoming events.</p> */}
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 flex-1 flex flex-col min-h-175">
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
