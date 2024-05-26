import create from 'zustand';

export const useGlobalStore = create((set) => ({
  inputFoodName: '',
  dailyBudget: 500.0,
  selectedDate: -1,
  daysBudgetArray: new Array(31).fill(0.0),
  grabPriceTotal1: 0.0,
  fairPriceTotal: 0.0,
  remainingMonthlyBudget: 500.0,

  setinputFoodName: (value) => set({ inputFoodName: value }),
  // setGrabPriceTotal: (value) => set({ grabPriceTotal: value }),
  setRemainingMonthlyBudget: (value) => set({ remainingMonthlyBudget: value }),
  setFairPriceTotal: (value) => set({ fairPriceTotal: value }),
  setGrabPriceTotal: (value) => set({ grabPriceTotal1: value }),
  setDailyBudget: (value) => set({ dailyBudget: value }),
  setSelectedDate: (value) => set({ selectedDate: value }),
  
  setDaysArrayAddition: (index, value) => set((state) => {
    const newArray = [...state.daysBudgetArray];
    newArray[index] += value;
    return { daysBudgetArray: newArray };
  }),

  setDaysArraySubtraction: (index, value) => set((state) => {
    const newArray = [...state.daysBudgetArray];
    newArray[index] -= value;
    return { daysBudgetArray: newArray };
  })
}));