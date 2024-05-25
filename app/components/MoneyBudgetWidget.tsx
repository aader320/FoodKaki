"use client"
import React, { useState } from 'react';

const MoneyBudgetWidget: React.FC = () => {
  const [budget, setBudget] = useState<number>(0);
  const [expenses, setExpenses] = useState<number>(0);
  const [expenseInput, setExpenseInput] = useState<number | undefined>();

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
    }
  };

  const remainingBudget = budget - expenses;

  return (
    <div className="border rounded shadow p-4">
      <h2 className="text-xl mb-4">Money Budget Widget</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Total Budget:</label>
        <input
          type="number"
          value={budget}
          onChange={handleBudgetChange}
          className="input input-bordered w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Add Expense:</label>
        <div className="flex">
          <input
            type="number"
            value={expenseInput || ''}
            onChange={handleExpenseChange}
            className="input input-bordered w-full"
          />
          <button onClick={addExpense} className="btn btn-primary ml-2">Add</button>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Total Expenses: ${expenses}</label>
      </div>
      <div>
        <label className="block text-gray-700">Remaining Budget: ${remainingBudget}</label>
      </div>
    </div>
  );
};

export default MoneyBudgetWidget;
