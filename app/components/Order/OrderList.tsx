"use client";

import React, { useState } from 'react';
import OrderCard from './OrderCard';

interface Order {
  id: number;
  image: string;
  title: string;
  price: string;
}

const orders = [
  { id: 1, image: 'https://food.grab.com/static/images/logo-grabfood2.svg', title: 'Grab Order', price: '$10.00' },
  { id: 2, image: 'https://www.fairprice.com.sg/_next/static/images/fpg50-desktop-logo-b1bc71df2689859b9a84c04b577b2acc.svg', title: 'NTUC Order', price: '$20.00' },
];

const OrderList: React.FC = () => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

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
        <OrderCard
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

export default OrderList;
