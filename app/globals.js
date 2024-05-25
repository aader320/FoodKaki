import create from 'zustand';

export const useGlobalStore = create((set) => ({
  inputFoodName: '',

  setinputFoodName: (value) => set({ inputFoodName: value }),
}))