"use client";

import React, { useState, useEffect } from 'react';
import IngredientCard from './IngredientCard';
import { useGlobalStore } from '../../globals';

const IngredientList: React.FC = () => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const { inputFoodName } = useGlobalStore();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (inputFoodName) {
      generateIngredients(inputFoodName);
    }
  }, [inputFoodName]);

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
        // Ensure data is an array
        if (Array.isArray(data)) {
          setData(data);
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

  const fetchData = (ingredientName: string) => {
    setLoading(true);
    fetch('http://localhost:3001/api/submitFairPrice', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: ingredientName }),
    })
      .then(response => response.json())
      .then(data => {
        // Wrap the data in an array to ensure data is always an array
        setData([data]);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false);
      });
  };

  const toggleSelect = (id: number, name: string) => {
    fetchData(name);
  };

  return (
    <div className="container mx-auto p-4">
      {loading && <p>Loading...</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {data.map((item: any) => (
          <IngredientCard
            key={item.id}
            image={item.Image || 'default-image.jpg'}  // Provide a default image
            name={item.Name}
            price={item.Price || 'N/A'}  // Provide a default price
            selected={selectedIds.includes(item.id)}
            onSelect={() => toggleSelect(item.id, item.Name)}
          />
        ))}
      </div>
    </div>
  );
};

export default IngredientList;
