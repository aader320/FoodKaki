"use client";

import React, { useState, FormEvent, useEffect, useRef } from 'react';
import IngredientCard from './IngredientCard';
import { useGlobalStore } from '../../globals';

const IngredientList: React.FC = () => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const { inputFoodName } = useGlobalStore();
  const [data, setData] = useState<any[]>([]);
  const fetchCalled = useRef(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (fetchCalled.current) return;
    if (inputFoodName) {
      fetchData();
      fetchCalled.current = true; // Mark fetch as called
    }
  }, [inputFoodName]);

  const fetchData = () => {
    setData([]);
    fetch('http://localhost:3001/api/submitFairPrice', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: inputFoodName }),
    })
    .then(response => response.json())
    .then(data => {
        setData(data); // Set received data to state
        console.log(`Server says: ${data}`);
    })
    .catch(error => console.error('Error:', error));
  };

  const generateIngredients = (foodName: string) => {
    setLoading(true);
    fetch('http://localhost:3001/api/generateIngredients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputFoodName: foodName }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.ingredients && Array.isArray(data.ingredients)) {
          const transformedData = data.ingredients.map((ingredient: string, index: number) => ({
            id: index,
            image: 'default-image.jpg', // lowercase 'image'
            name: ingredient,           // lowercase 'name'
            price: 'N/A',               // lowercase 'price'
          }));
          setData(transformedData);
          console.log(transformedData);
        } else {
          console.error('Unexpected data format:', data);
          setData([]);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false);
      });
  };

  const toggleSelect = (id: number) => {
    setSelectedIds((prevSelectedIds) =>
      prevSelectedIds.includes(id)
        ? prevSelectedIds.filter((selectedId) => selectedId !== id)
        : [...prevSelectedIds, id]
    );
  };

  return (
    <div className="container mx-auto p-4">
      {data.length === 0 && <p>Loading...</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {data.map((item: any) => (
          <IngredientCard
            key={item.id}
            image={item.Image}
            name={item.Name}
            price={item.Price}
            selected={selectedIds.includes(item.id)}
            onSelect={() => toggleSelect(item.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default IngredientList;
