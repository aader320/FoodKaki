"use client";

import React, { useState } from 'react';
import { useEffect } from 'react';
import GrabOrderCard from './GrabOrderCard';
import {useGlobalStore} from '../../globals'

const orders = [
  { id: 1, image: '/path/to/image1.jpg', title: 'Order 1', price: '$10.00' },
  { id: 2, image: '/path/to/image2.jpg', title: 'Order 2', price: '$15.00' },
  { id: 3, image: '/path/to/image3.jpg', title: 'Order 3', price: '$20.00' },
  { id: 4, image: '/path/to/image4.jpg', title: 'Order 4', price: '$25.00' },
  // Add more orders as needed
];

const GrabOrderList: React.FC = () => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [data, setData] = useState<any[]>([]);
  const { inputFoodName, setInputFoodName } = useGlobalStore();

  useEffect(() => {
    setData([]);
    fetch('http://localhost:3001/api/submitGrab', {
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

  }, []);

  const toggleSelect = (id: number) => {
    setSelectedIds((prevSelectedIds) =>
      prevSelectedIds.includes(id)
        ? prevSelectedIds.filter((selectedId) => selectedId !== id)
        : [...prevSelectedIds, id]
    );
  };

  return (
    <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
      {orders.map((order) => (
        <GrabOrderCard
          key={order.id}
          image={order.image}
          title={order.title}
          price={order.price}
          selected={selectedIds.includes(order.id)}
          onSelect={() => toggleSelect(order.id)}
        />
      ))}
    </div>
  );
};

export default GrabOrderList;
