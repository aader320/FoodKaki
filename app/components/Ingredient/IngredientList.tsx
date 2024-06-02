import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import IngredientCard from './IngredientCard';
import { useGlobalStore } from '../../globals';
import Overlay from './Overlay';
import Spinner from '../Spinner';  // Import the Spinner component

const IngredientList: React.FC = () => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const { inputFoodName, setFairPriceTotal } = useGlobalStore();
  const [data, setData] = useState<any[]>([]);
  const [overlayItems, setOverlayItems] = useState<{ Name: string; Price: number; Image: string }[]>([]);
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null); // Track selected card ID
  const fetchCalled = useRef(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [overlayVisible, setOverlayVisible] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<{ Name: string; Price: number; Image: string }[]>([]); // Items in cart

  const router = useRouter();

  useEffect(() => {
    if (fetchCalled.current) return;
    if (inputFoodName) {
      generateIngredients(inputFoodName);
      fetchCalled.current = true; // Mark fetch as called
    }
  }, [inputFoodName]);

  const generateIngredients = (foodName: string) => {
    setLoading(true);
    fetch('http://localhost:3001/api/generateIngredients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputFoodName: foodName }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Received data:', data); // Log received data
        if (data && Array.isArray(data)) {
          const transformedData = data.map((ingredient: string, index: number) => ({
            id: index,
            image: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDI0IDI0Ij48ZyBmaWxsPSJibGFjayI+PHJlY3Qgd2lkdGg9IjQiIGhlaWdodD0iNCIgeD0iMyIgeT0iMTAiIHJ4PSIyIi8+PHJlY3Qgd2lkdGg9IjQiIGhlaWdodD0iNCIgeD0iMTAiIHk9IjEwIiByeD0iMiIvPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIHg9IjE3IiB5PSIxMCIgcng9IjIiLz48L2c+PC9zdmc+', // default image
            name: ingredient,           // ingredient name
            price: 'Tap to select item', // default price
          }));
          setData(transformedData);
        } else {
          console.error('Unexpected data format:', data);
          setData([]);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false);
      });
  };

  const fetchData = (ingredientName: string) => {
    setLoading(true);
    fetch('http://localhost:3001/api/submitFairPrice', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: ingredientName }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Fetched overlay data:', data); // Log fetched overlay data
        setOverlayItems(data); // Set fetched data to overlay items
        setOverlayVisible(true); // Show overlay after data is fetched
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false);
      });
  };

  const toggleSelect = (id: number, ingredientName: string) => {
    setSelectedIds((prevSelectedIds) =>
      prevSelectedIds.includes(id)
        ? prevSelectedIds.filter((selectedId) => selectedId !== id)
        : [...prevSelectedIds, id]
    );
    setSelectedCardId(id); // Store the selected card ID
    fetchData(ingredientName); // Fetch data for the clicked ingredient
  };

  const handleOverlayClose = (selectedOverlayItem: { Name: string; Price: number; Image: string } | null) => {
    if (selectedOverlayItem && selectedCardId !== null) {
      const updatedData = data.map(item =>
        item.id === selectedCardId ? { ...item, name: selectedOverlayItem.Name, price: `$${selectedOverlayItem.Price.toFixed(2)}`, image: selectedOverlayItem.Image } : item
      );
      setData(updatedData);
    }
    setOverlayVisible(false);
  };

  const handleAddToCart = () => {
    const selectedItems = data.filter(item => selectedIds.includes(item.id));
    setCartItems(selectedItems);
    const total = selectedItems.reduce((sum, item) => sum + parseFloat(item.price.replace('$', '')), 0);
    setFairPriceTotal(total);
    router.push('/selectOrder');
  };

  if (loading) {
    return <Spinner />;  // Display Spinner while data is loading
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {data.map((item) => (
          <IngredientCard
            key={item.id}
            image={item.image}
            name={item.name}
            price={item.price}
            selected={selectedIds.includes(item.id)}
            onSelect={() => toggleSelect(item.id, item.name)}
          />
        ))}
      </div>
      {overlayVisible && <Overlay items={overlayItems} onClose={handleOverlayClose} />} {/* Overlay component */}
      <button onClick={handleAddToCart} className="mt-4 p-2 bg-blue-500 text-white rounded">Add to cart</button>
    </div>
  );
};

export default IngredientList;
