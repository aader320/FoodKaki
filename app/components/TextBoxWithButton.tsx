"use client";

import React, { useState } from 'react';
import { useGlobalStore } from "../globals"; // Use global store
import { useRouter } from 'next/navigation'; // Use next/navigation

const TextBoxWithButton: React.FC = () => {
  const { inputFoodName, setinputFoodName } = useGlobalStore();
  const router = useRouter();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputFoodName(event.target.value);
    //console.log(inputFoodName)
  };

  const handleButtonClick = () => {
    if (inputFoodName.trim() !== '') {
      router.push('/selectOrder'); // Replace with your desired route
    }
  };

  return (
    <div className="flex items-center border rounded shadow p-2">
      <input
        type="text"
        placeholder="What do you want to eat today?"
        value={inputFoodName}
        onChange={handleInputChange}
        className="input input-bordered w-full"
      />
      <button onClick={handleButtonClick} className="btn btn-primary ml-2">Enter</button>
    </div>
  );
};

export default TextBoxWithButton;
