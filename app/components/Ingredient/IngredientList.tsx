"use client";

import React, { useState, FormEvent } from 'react';
import IngredientCard from './IngredientCard';
import { useGlobalStore } from '../../globals';

const ingredients = [
  { id: 1, image: '/path/to/image1.jpg', name: 'Ingredient 1', price: '$1.00' },
  { id: 2, image: '/path/to/image2.jpg', name: 'Ingredient 2', price: '$2.00' },
  { id: 3, image: '/path/to/image3.jpg', name: 'Ingredient 3', price: '$3.00' },
  { id: 4, image: '/path/to/image4.jpg', name: 'Ingredient 4', price: '$4.00' },
  // Add more ingredients as needed
];

const IngredientList: React.FC = () => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const { inputFoodName, setInputFoodName } = useGlobalStore();
  const [data, setData] = useState<any[]>([]);
  const [input, setInput] = useState<string>('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setData([]);
    fetch('http://localhost:3001/api/submitFairPrice', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: input }),
    })
    .then(response => response.json())
    .then(data => {
        setData(data); // Set received data to state
        console.log(`Server says: ${data}`);
    })
    .catch(error => console.error('Error:', error));
};

  const toggleSelect = (id: number) => {
    setSelectedIds((prevSelectedIds) =>
      prevSelectedIds.includes(id)
        ? prevSelectedIds.filter((selectedId) => selectedId !== id)
        : [...prevSelectedIds, id]
    );
  };

  return (
    <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
      {ingredients.map((ingredient) => (
        <IngredientCard
          key={ingredient.id}
          image={ingredient.image}
          name={ingredient.name}
          price={ingredient.price}
          selected={selectedIds.includes(ingredient.id)}
          onSelect={() => toggleSelect(ingredient.id)}
        />
      ))}
    </div>
  );
};

export default IngredientList;
