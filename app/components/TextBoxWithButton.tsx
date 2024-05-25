"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Use next/navigation

const TextBoxWithButton: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const router = useRouter();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value)
    setInputValue(event.target.value);
  };

  const handleButtonClick = () => {
    if (inputValue.trim() !== '') {
      // Assuming you have set up Zustand as described earlier
      // setSearchQuery(inputValue);  // Uncomment if you are using Zustand
      router.push('/selectOrder'); // Replace with your desired route
    }
  };

  return (
    <div className="flex items-center border rounded shadow p-2">
      <input
        type="text"
        placeholder="What do you want to eat today?"
        value={inputValue}
        onChange={handleInputChange}
        className="input input-bordered w-full"
      />
      <button onClick={handleButtonClick} className="btn btn-primary ml-2">Enter</button>
    </div>
  );
};

export default TextBoxWithButton;
