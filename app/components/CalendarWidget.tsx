"use client"

import React, { useState, useRef } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useGlobalStore } from '../globals';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const CalendarWidget: React.FC = () => {
  const [mSelectedDate, setValue] = useState<Value>(new Date());
  const [ mDailyRemainingBudget, setDailyRemainingBudget ] = useState<number>(0.0);
  const { dailyBudget, setSelectedDate, daysBudgetArray, selectedDate, remainingMonthlyBudget } = useGlobalStore();

  const handleDateChange = (value: Value) => {
    setValue(value);

    const dateobject = new Date(value as Date);
    const dayindex = dateobject.getDate() - 1;
    setSelectedDate(dayindex);
    //console.log(dayindex)
  }

  const tileClassName = ({ date }: { date: Date }) => {
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
    
    setDailyRemainingBudget(dailyBudget - daysBudgetArray[selectedDate])
    //console.log(dailyBudget - daysBudgetArray[selectedDate]);
    return null;
  }

  //const formattedRemainingBudget = daysBudgetArray[selectedDate].toFixed(2);
  const formattedRemainingBudget = "$" + mDailyRemainingBudget.toFixed(2);
  const formattedMonthlyRemainingBudget = "$" + remainingMonthlyBudget;
  //console.log(formattedRemainingBudget)
  
  return (
    <div className="flex border rounded shadow p-4">
      <div className="w-2/3">
        <Calendar
          onChange={handleDateChange}
          value={mSelectedDate}
          tileClassName={tileClassName}
        />
      </div>
      <div className="w-1/3 flex flex-col justify-center pl-4">
        <div className="text-left mb-4">
          <h2 className="text-sm md:text-3xl sm:text-md font-bold">Monthly Budget</h2>
          <p className="text-sm md:text-xl">{formattedMonthlyRemainingBudget}</p>
        </div>
        <div className="text-left">
          <h2 className="text-sm md:text-3xl sm:text-md font-bold">Remaining Daily Budget</h2>
          <p className="text-sm md:text-xl">{formattedRemainingBudget}</p>
        </div>
      </div>
    </div>
  );
};

export default CalendarWidget;
