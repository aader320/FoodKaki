"use client";

import React, { useState } from 'react';
import OrderCard from './OrderCard';
import { useGlobalStore } from '../../globals';

const orders = [
  { id: 1, 
    image: 'https://food.grab.com/static/images/logo-grabfood2.svg', 
    title: 'Grab Order', 
    href: '/grabOrderList' },
  { id: 2, 
    image: 'https://www.fairprice.com.sg/_next/static/images/fpg50-desktop-logo-b1bc71df2689859b9a84c04b577b2acc.svg', 
    title: 'NTUC Order', 
    href: '/ingredientList' },
];

const OrderList: React.FC = () => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const { fairPriceTotal, grabPriceTotal1, dailyBudget, setDailyBudget } = useGlobalStore();

  const toggleSelect = (id: number) => {
    setSelectedIds((prevSelectedIds) =>
      prevSelectedIds.includes(id)
        ? prevSelectedIds.filter((selectedId) => selectedId !== id)
        : [...prevSelectedIds, id]
    );
  };

  const handleGrabOrderConfirm = () => {
    setDailyBudget(dailyBudget - grabPriceTotal1);
  };

  const handleFairPriceOrderConfirm = () => {
    setDailyBudget(dailyBudget - fairPriceTotal);
  };

  return (
    <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
      {orders.map((order) => (
        <OrderCard
          key={order.id}
          image={order.image}
          title={order.title}
          href={order.href}
          selected={selectedIds.includes(order.id)}
          onSelect={() => toggleSelect(order.id)}
          priceTotal={order.id === 1 ? grabPriceTotal1 : order.id === 2 ? fairPriceTotal : undefined}
          confirmOrderVisible={order.id === 1 ? grabPriceTotal1 > 0 : order.id === 2 ? fairPriceTotal > 0 : false}
          onConfirmOrder={order.id === 1 ? handleGrabOrderConfirm : order.id === 2 ? handleFairPriceOrderConfirm : undefined}
        />
      ))}
    </div>
  );
};

export default OrderList;
