import React from 'react';
import IngredientCard from './IngredientCard';

interface OverlayProps {
  onClose: () => void;
  items: { Name: string; Price: number; Image: string }[]; // Accept items as props
}

const Overlay: React.FC<OverlayProps> = ({ onClose, items }) => {

  const handleCardClick = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg max-w-md w-full h-full overflow-auto">
        <button onClick={onClose} className="text-red-500 mb-4">Close</button>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.map((item, index) => (
            <IngredientCard
              key={index}
              image={item.Image}
              name={item.Name}
              price={`$${item.Price.toFixed(2)}`}
              selected={false}
              onSelect={handleCardClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Overlay;
