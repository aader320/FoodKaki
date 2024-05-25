import create from 'zustand';

export const useGlobalStore = create((set) => ({
  inputFoodName: '',
  dailyBudget: 0.0,
  selectedDate: -1,
  daysBudgetArray: new Array(31).fill(0.0),
  fairPriceTotal: 0.0,

  setinputFoodName: (value) => set({ inputFoodName: value }),
  setFairPriceTotal: (value) => set({ fairPriceTotal: value }),
  setDailyBudget: (value) => set({ dailyBudget: value }),
  setSelectedDate: (value) => set({ selectedDate: value }),
  setDaysArrayAddition: (index, value) => set((state) => {
    const newArray = [...state.daysBudgetArray];
    newArray[index] += value;
    return { daysBudgetArray: newArray };
  })
}));