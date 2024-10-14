'use client';

import { useState, useEffect } from 'react';
import Confetti from './Confetti';

interface Day {
  number: number;
  date: string;
  done: boolean;
}

const Calendar = () => {
  const [days, setDays] = useState<Day[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    fetchCalendarData();
  }, []);

  const fetchCalendarData = async () => {
    try {
      const response = await fetch('/api/calendar');
      if (!response.ok) throw new Error('Failed to fetch calendar data');
      const data = await response.json();
      setDays(data);
    } catch (error) {
      console.error('Error fetching calendar data:', error);
    }
  };

  const toggleDay = async (index: number) => {
    const updatedDays = days.map((day, i) =>
      i === index ? { ...day, done: !day.done } : day
    );
    setDays(updatedDays);

    try {
      const response = await fetch('/api/calendar', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedDays),
      });
      if (!response.ok) throw new Error('Failed to update calendar data');

      // Show confetti if the day was marked as done
      if (updatedDays[index].done) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000); // Hide confetti after 3 seconds
      }
    } catch (error) {
      console.error('Error updating calendar data:', error);
      // Revert the change if the update failed
      fetchCalendarData();
    }
  };

  return (
    <>
      {showConfetti && <Confetti />}
      <div className="grid grid-cols-4 gap-2 w-full">
        {days.map((day, index) => (
          <div
            key={day.number}
            className={`border p-4 text-center cursor-pointer ${day.done ? 'bg-green-100' : 'bg-[#faf9f6]'}`}
            onClick={() => toggleDay(index)}
          >
            <div className="font-bold">{day.number}</div>
            <div>{day.date}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Calendar;
