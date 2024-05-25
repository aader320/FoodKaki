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
}

const OrderCard: React.FC<OrderCardProps> = ({ image, title, selected, onSelect, href, priceTotal }) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(href);
  };

  return (
    <div
      className={`card shadow-lg cursor-pointer ${selected ? 'border-2 border-primary' : ''}`}
      onClick={handleCardClick}
    >
      <figure>
        <img src={image} alt={title} className="w-full h-48 object-cover" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        {priceTotal !== undefined && priceTotal > 0 && (
          <p className="text-gray-500">Total: ${priceTotal.toFixed(2)}</p>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
