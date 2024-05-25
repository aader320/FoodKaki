"use client"
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarWidget: React.FC = () => {
  const [value, setValue] = useState(new Date());

  return (
    <div className="border rounded shadow p-4">
      <Calendar />
    </div>
  );
};

export default CalendarWidget;
