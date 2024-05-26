"use client"
import React, { useState, useEffect } from 'react';
import { useGlobalStore } from "../globals"; // Use global store


const MoneyBudgetWidget: React.FC = () => {
  const [budget, setBudget] = useState<number>(500);
  const [expenses, setExpenses] = useState<number>(0);
  const [expenseInput, setExpenseInput] = useState<number | undefined>();
  const { setDailyBudget, setDaysArrayAddition, selectedDate, remainingMonthlyBudget, setRemainingMonthlyBudget } = useGlobalStore();
  const [dailyBudget, setDailyBudgetCalculated] = useState<number>(0);

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBudget(Number(e.target.value));
  };
  
  const handleExpenseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpenseInput(Number(e.target.value));
  };
  
  const addExpense = () => {
    if (expenseInput) {
      setExpenses(expenses + expenseInput);
      setExpenseInput(undefined);
      setDaysArrayAddition(selectedDate, expenseInput);
    }
    setRemainingMonthlyBudget(remainingMonthlyBudget - Number(expenseInput));
  };

  const remainingBudget = budget - expenses;
  useEffect(() => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const nextMonthFirstDay = new Date(year, month, 0);
    const calculatedDailyBudget = budget / nextMonthFirstDay.getDate();

    setDailyBudgetCalculated(calculatedDailyBudget);
    setDailyBudget(calculatedDailyBudget);
  }, [budget, setDailyBudget]);

  return (
    <div className="border rounded shadow p-4">
      <h2 className="text-xl mb-4">Money Budget Widget</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Add Expense:</label>
        <div className="flex">
          <input
            type="number"
            value={expenseInput || ''}
            onChange={handleExpenseChange}
            className="input input-bordered w-full"
          />
          <button onClick={addExpense} className="btn bg-customGreen-100 ml-2">Add</button>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Total Expenses: ${expenses}</label>
      </div>
      <div>
        <label className="block text-gray-700 ">Remaining Budget: ${remainingBudget}</label>
      </div>
    </div>
  );
};

export default MoneyBudgetWidget;
