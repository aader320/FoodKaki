import React, { useState, useEffect, useRef } from 'react';
import IngredientCard from './IngredientCard';
import { useGlobalStore } from '../../globals';
import Overlay from './Overlay';

const IngredientList: React.FC = () => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const { inputFoodName } = useGlobalStore();
  const [data, setData] = useState<any[]>([]);
  const [overlayItems, setOverlayItems] = useState<{ Name: string; Price: number; Image: string }[]>([]);
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null); // Track selected card ID
  const fetchCalled = useRef(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [overlayVisible, setOverlayVisible] = useState<boolean>(false);

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
        console.log('Fetched overlay data:', data); // Log fetched overlay data
        setOverlayItems(data); // Set fetched data to overlay items
        setLoading(false);
        setOverlayVisible(true); // Show overlay after data is fetched
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false);
      });
  };

  const toggleSelect = (id: number, ingredientName: string) => {
    setSelectedIds((prevSelectedIds) =>
      prevSelectedIds.includes(id)
        ? prevSelectedIds.filter((selectedId) => selectedId !== id)
        : [...prevSelectedIds, id]
    );
    setSelectedCardId(id); // Store the selected card ID
    fetchData(ingredientName); // Fetch data for the clicked ingredient
  };

  const handleOverlayClose = (selectedOverlayItem: { Name: string; Price: number; Image: string }) => {
    if (selectedCardId !== null) {
      const updatedData = data.map(item =>
        item.id === selectedCardId ? { ...item, name: selectedOverlayItem.Name, price: `$${selectedOverlayItem.Price.toFixed(2)}`, image: selectedOverlayItem.Image } : item
      );
      setData(updatedData);
    }
    setOverlayVisible(false);
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
            onSelect={() => toggleSelect(item.id, item.name)}
          />
        ))}
      </div>
      {overlayVisible && <Overlay items={overlayItems} onClose={handleOverlayClose} />} {/* Overlay component */}
    </div>
  );
};

export default IngredientList;
