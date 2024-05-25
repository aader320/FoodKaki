"use client";

import { useGlobalStore } from '@/app/globals';
import React, { useState, useEffect, useRef } from 'react';
import GrabOrderCard from './GrabOrderCard';

interface FoodItem {
  name: string;
  priceInMinorUnit: number;
  imgHref: string;
}

interface Order {
  ID: string;
  Details: {
    Name: string;
    Cuisine: string;
    Food: FoodItem[];
  };
}

const GrabOrderList: React.FC = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [data, setData] = useState<Order[]>([]);
  const fetchCalled = useRef(false);
  const { inputFoodName, setInputFoodName } = useGlobalStore();
  useEffect(() => {
    if (fetchCalled.current) return;
    // Fetch initial data if needed
    fetch('http://localhost:3001/api/submitGrab', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: inputFoodName }), // Example search term
    })
      .then(response => response.json())
      .then(data => {
        setData(data); // Set initial data to state
        console.log(`Initial data: ${data}`);
      })
      .catch(error => console.error('Error:', error));
      fetchCalled.current = true; // Mark fetch as called
  }, []);

  const toggleSelect = (id: string) => {
    setSelectedIds((prevSelectedIds) =>
      prevSelectedIds.includes(id)
        ? prevSelectedIds.filter((selectedId) => selectedId !== id)
        : [...prevSelectedIds, id]
    );
  };

  return (
    <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
      {data.map((order) =>
        order.Details.Food.map((foodItem, index) => (
          <GrabOrderCard
            key={`${order.ID}-${index}`}
            shopName={order.Details.Name}
            foodName={foodItem.name}
            price={(foodItem.priceInMinorUnit / 100).toFixed(2)}
            image={foodItem.imgHref}
            selected={selectedIds.includes(`${order.ID}-${index}`)}
            onSelect={() => toggleSelect(`${order.ID}-${index}`)}
          />
        ))
      )}
    </div>
  );
};

export default GrabOrderList;
