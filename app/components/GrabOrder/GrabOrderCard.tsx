import React from 'react';

interface GrabOrderCardProps {
  image: string;
  title: string;
  price: string;
  selected: boolean;
  onSelect: () => void;
}

const GrabOrderCard: React.FC<GrabOrderCardProps> = ({ image, title, price, selected, onSelect }) => {
  return (
    <div
      className={`card shadow-lg cursor-pointer ${selected ? 'border-2 border-primary' : ''}`}
      onClick={onSelect}
    >
      <figure>
        <img src={image} alt={title} className="w-full h-24 object-cover" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p className="text-gray-500">{price}</p>
      </div>
    </div>
  );
};

export default GrabOrderCard;
