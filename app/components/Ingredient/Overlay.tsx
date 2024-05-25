import React, { useState } from 'react';
import IngredientCard from './IngredientCard';

interface OverlayProps {
  onClose: (selectedItem: { Name: string; Price: number; Image: string }) => void;
  items: { Name: string; Price: number; Image: string }[]; // Accept items as props
}

const Overlay: React.FC<OverlayProps> = ({ onClose, items }) => {
  const [selectedOverlayItem, setSelectedOverlayItem] = useState<{ Name: string; Price: number; Image: string } | null>(null);

  const handleCardClick = (item: { Name: string; Price: number; Image: string }) => {
    setSelectedOverlayItem(item);
    onClose(item);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg max-w-md w-full h-full overflow-auto">
        <button onClick={() => onClose(selectedOverlayItem || items[0])} className="text-red-500 mb-4">Close</button>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.map((item, index) => (
            <IngredientCard
              key={index}
              image={item.Image}
              name={item.Name}
              price={`$${item.Price.toFixed(2)}`}
              selected={false}
              onSelect={() => handleCardClick(item)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Overlay;
