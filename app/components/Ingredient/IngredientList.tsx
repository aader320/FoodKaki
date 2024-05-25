import React, { useState, useEffect, useRef } from 'react';
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
      generateIngredients(inputFoodName);
      fetchCalled.current = true; // Mark fetch as called
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
        console.log('Received data:', data); // Log received data
        if (data && Array.isArray(data)) {
          const transformedData = data.map((ingredient: string, index: number) => ({
            id: index,
            image: 'default-image.jpg', // default image
            name: ingredient,           // ingredient name
            price: 'N/A',               // default price
          }));
          setData(transformedData);
          console.log('Transformed data:', transformedData); // Log transformed data
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
      {loading && <p>Loading...</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {data.map((item) => (
          <IngredientCard
            key={item.id}
            image={item.image}
            name={item.name}
            price={item.price}
            selected={selectedIds.includes(item.id)}
            onSelect={() => toggleSelect(item.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default IngredientList;
