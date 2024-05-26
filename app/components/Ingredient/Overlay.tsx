import React, { useState, useEffect } from 'react';
import IngredientCard from './IngredientCard';

interface OverlayProps {
  onClose: (selectedItem: { Name: string; Price: number; Image: string } | null) => void;
  items: { Name: string; Price: number; Image: string }[]; // Accept items as props
}

const Overlay: React.FC<OverlayProps> = ({ onClose, items }) => {
  const [selectedOverlayItem, setSelectedOverlayItem] = useState<{ Name: string; Price: number; Image: string } | null>(null);

  useEffect(() => {
    if (items.length === 0) {
      const timer = setTimeout(() => {
        onClose(null);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [items, onClose]);

  const handleCardClick = (item: { Name: string; Price: number; Image: string }) => {
    setSelectedOverlayItem(item);
    onClose(item);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg max-w-md w-full h-full overflow-auto">
        <button onClick={() => onClose(selectedOverlayItem)} className="text-red-500 mb-4">Close</button>
        {items.length === 0 ? (
          <p className="text-center text-gray-500">No result was found</p>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default Overlay;
