import React from 'react';

interface GrabOrderCardProps {
  shopName: string;
  foodName: string;
  price: string;
  image: string;
  selected: boolean;
  onSelect: () => void;
}

const GrabOrderCard: React.FC<GrabOrderCardProps> = ({ shopName, foodName, price, image, selected, onSelect }) => {
  return (
    <div
      className={`card shadow-lg cursor-pointer ${selected ? 'border-2 border-primary' : ''}`}
      onClick={onSelect}
    >
      <figure>
        <img src={image} alt={foodName} className="w-full h-24 object-contain" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{shopName}</h2>
        <p className="text-gray-500">{foodName}</p>
        <p className="text-gray-500">{price}</p>
      </div>
    </div>
  );
};

export default GrabOrderCard;
