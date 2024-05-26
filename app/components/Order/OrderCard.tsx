"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

interface OrderCardProps {
  image: string;
  title: string;
  href: string;
  selected: boolean;
  onSelect: () => void;
  priceTotal?: number; // Optional prop for displaying price total
  confirmOrderVisible?: boolean; // Optional prop for showing confirm order button
  onConfirmOrder?: () => void; // Prop to handle order confirmation
}

const OrderCard: React.FC<OrderCardProps> = ({ image, title, selected, onSelect, href, priceTotal, confirmOrderVisible, onConfirmOrder }) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(href);
  };

  const handleConfirmOrder = () => {
    if (onConfirmOrder) {
      onConfirmOrder();
    }
    router.push('/'); // Navigate to the default page
  };

  return (
    <div className={`card shadow-lg cursor-pointer ${selected ? 'border-2 border-primary' : ''}`}>
      <figure onClick={handleCardClick}>
        <img src={image} alt={title} className="w-full h-48 object-cover" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        {priceTotal !== undefined && priceTotal > 0 && (
          <p className="text-gray-500">Total: ${priceTotal.toFixed(2)}</p>
        )}
        {confirmOrderVisible && (
          <button onClick={handleConfirmOrder} className="mt-2 p-2 bg-green-500 text-white rounded">
            Confirm Order
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
