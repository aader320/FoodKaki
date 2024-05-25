"use client"

import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useGlobalStore } from '../globals';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const CalendarWidget: React.FC = () => {
  const [selectedDate, setValue] = useState<Value>(new Date());
  const { dailyBudget, setSelectedDate, daysBudgetArray } = useGlobalStore();
  //const datesArr = new Array(30).fill(0);

  const handleDateChange = (value: Value) => {
    setValue(value);

    const dateobject = new Date(value as Date);
    const dayindex = dateobject.getDate() - 1;
    setSelectedDate(dayindex);
    //console.log(dayindex)
  }

  const tileClassName = ({date, view}) => {
    // check if the day of the week is sunday (0) or saturday (6)
    const currentdateindex = date.getDate() - 1;
    const today = new Date();

    if (daysBudgetArray[currentdateindex] > dailyBudget && date.getMonth() == today.getMonth() && date.getFullYear() == today.getFullYear()) {
      return 'bg-red-200';
    } 
    else if(currentdateindex === today.getDate() - 1) {
      return 'bg-yellow-200'
    }
    else if(date.getMonth() == today.getMonth() && date.getFullYear() == today.getFullYear() && today.getDate() > currentdateindex) {
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
