import React from 'react';
import IngredientCard from './IngredientCard';

interface OverlayProps {
  onClose: () => void;
}

const Overlay: React.FC<OverlayProps> = ({ onClose }) => {
  const blankCards = Array(20).fill({ id: 0, image: '', name: '', price: '' }); // Example with more cards for scrolling

  const handleCardClick = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg max-w-md w-full h-full overflow-auto">
        <button onClick={onClose} className="text-red-500 mb-4">Close</button>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {blankCards.map((item, index) => (
            <IngredientCard
              key={index}
              image={item.image}
              name={item.name}
              price={item.price}
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
