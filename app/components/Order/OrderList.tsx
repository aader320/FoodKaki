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
  const { fairPriceTotal, grabPriceTotal1, dailyBudget, setRemainingMonthlyBudget, remainingMonthlyBudget } = useGlobalStore();

  const toggleSelect = (id: number) => {
    setSelectedIds((prevSelectedIds) =>
      prevSelectedIds.includes(id)
        ? prevSelectedIds.filter((selectedId) => selectedId !== id)
        : [...prevSelectedIds, id]
    );
  };

  const handleGrabOrderConfirm = () => {
    setRemainingMonthlyBudget(remainingMonthlyBudget - grabPriceTotal1);
  };

  const handleFairPriceOrderConfirm = () => {
    setRemainingMonthlyBudget(remainingMonthlyBudget - fairPriceTotal);
  };

  return (


    <div className="min-h-screen flex flex-col items-center mt-10">
    <h1 className="text-4xl font-bold text-center mb-4">Chipotle Cheesy CHicken Burger</h1>
    <h2 className="text-xl text-center mb-4">A signature flame-grilled chicken patty topped with smoked beef</h2>
        <div className="  shadow-lg rounded-full flex items-center justify-center">
        <img src="/burger.png" alt="Description of Image" className="  mb-4" />
        </div>

        {/* <div className="m-5  flex items-center space-x-12  "> 
            <div className=" font-bold items-center justify-center rounded-badge shadow-lg bg-green-500 hover:bg-green-600  ">
                <h1 className="mt-10 flex items-center justify-center text-md md:text-3xl">Home Made</h1>
                    <div className="flex items-center justify-center ">
                        <img src="/burger.png" alt="Description of Image" className="w-full sm:w-1/3 md:w-1/2 lg:w-3/4 mb-20" />
                    </div>
                </div>

            <div className="m-5  font-bold items-center justify-center rounded-badge shadow-lg  ">
                <h1 className="mt-10 flex items-center justify-center text-md md:text-3xl">Delivery</h1>
                    <div className="flex items-center justify-center">
                        <img src="/burger.png" alt="Description of Image" className="w-full sm:w-1/3 md:w-1/2 lg:w-3/4 mb-20" />
                    </div>
            </div>

            
        </div>
        <div className='flex space-y-20'> 
        <text className='text-white'> 1</text>
        <text className='text-white'> 1 </text>
        </div> */}


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

        <div className='flex space-y-20'> 
        <text className='text-white'> 1</text>
        <text className='text-white'> 1 </text>
        </div>
    </div>

    </div>
    





  );
};

export default OrderList;
