import React from 'react';

interface IngredientCardProps {
  image: string;
  name: string;
  price: string;
  selected: boolean;
  onSelect: () => void;
}

const IngredientCard: React.FC<IngredientCardProps> = ({ image, name, price, selected, onSelect }) => {
  return (
    <div
      className={`card shadow-lg cursor-pointer ${selected ? 'border-2 border-primary' : ''}`}
      onClick={onSelect}
    >
      <figure>
        <img src={image} alt={name} className="w-full h-48 object-cover" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p className="text-gray-500">{price}</p>
      </div>
    </div>
  );
};

export default IngredientCard;
