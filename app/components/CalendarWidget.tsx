"use client"

import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const CalendarWidget: React.FC = () => {
  const [selectedDate, setValue] = useState<Value>(new Date());
  const datesArr = new Array(30).fill(0);
  const DAILY_BUDGET = 16;

  const handleDateChange = (value: Value) => {
    setValue(value);
    console.log(value)
  }

  const tileClassName = ({date, view}) => {
    // check if the day of the week is sunday (0) or saturday (6)
    const currentdate = date.getDate() - 1;
    const today = new Date();

    console.log(currentdate)
    if (datesArr[currentdate] > DAILY_BUDGET) {
      return 'bg-red-200';
    } 
    else if(currentdate === today.getDate() - 1) {
      return 'bg-yellow-200'
    }
    else if(date.getMonth() == today.getMonth() && date.getFullYear() == today.getFullYear() && today.getDate() > currentdate) {
      return 'bg-green-200'
    }
    return null;
  }

  return (
    <div className="border rounded shadow p-4">
      <Calendar
        onChange = {handleDateChange}
        value = {selectedDate}
        tileClassName={tileClassName}
      />
    </div>
  );
};

export default CalendarWidget;
