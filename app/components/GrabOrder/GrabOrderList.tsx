"use client";

import { useGlobalStore } from '../../globals';
import React, { useState, useEffect, useRef } from 'react';
import GrabOrderCard from './GrabOrderCard';
import Modal from '../../components/Modal'; // Create a new Modal component
import { useRouter } from 'next/navigation'; // Use next/navigation

interface FoodItem {
  name: string;
  priceInMinorUnit: number;
  imgHref: string;
}

interface Order {
  ID: string;
  Details: {
    Name: string;
    Cuisine: string;
    Food: FoodItem[];
  };
}

const GrabOrderList: React.FC = () => {
  const { grabPriceTotal1, setGrabPriceTotal } = useGlobalStore();
  const { fairPriceTotal, setFairPriceTotal } = useGlobalStore();
  const { inputFoodName, setinputFoodName } = useGlobalStore();
  
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [data, setData] = useState<Order[]>([]);
  const [selectedCard, setSelectedCard] = useState<FoodItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fetchCalled = useRef(false);
  const router = useRouter();
  useEffect(() => {
    if (fetchCalled.current) return;
    fetch('http://localhost:3001/api/submitGrab', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data:inputFoodName }), // Example search term
    })
      .then(response => response.json())
      .then(data => {
        setData(data);
        console.log(`Initial data: ${data}`);
      })
      .catch(error => console.error('Error:', error));
    fetchCalled.current = true;
  }, []);

  const toggleSelect = (id: string, foodItem: FoodItem) => {
    setSelectedIds((prevSelectedIds) =>
      prevSelectedIds.includes(id)
        ? prevSelectedIds.filter((selectedId) => selectedId !== id)
        : [...prevSelectedIds, id]
    );
    setSelectedCard(foodItem);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCard(null);
  };

  const buyFood = (val: any) => {
    // console.log("val: " + val);
    const val1 = Number(val / 100);
    // setFairPriceTotal(val1);
    setGrabPriceTotal(val1);
    // console.log("val1: " + val1);
    setTimeout(() =>{}, 1000);
    // console.log("grab price: " + grabPriceTotal1);
    // console.log("fiar price: " + fairPriceTotal);
    router.push('/selectOrder');
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
      {data.map((order) =>
        order.Details.Food.map((foodItem, index) => (
          <GrabOrderCard
            key={`${order.ID}-${index}`}
            shopName={order.Details.Name}
            foodName={foodItem.name}
            price={(foodItem.priceInMinorUnit / 100).toFixed(2)}
            image={foodItem.imgHref}
            selected={selectedIds.includes(`${order.ID}-${index}`)}
            onSelect={() => toggleSelect(`${order.ID}-${index}`, foodItem)}
          />
        ))
      )}

      {isModalOpen && selectedCard && (
        <Modal onClose={closeModal}>
          <GrabOrderCard
            shopName=""
            foodName={selectedCard.name}
            price={(selectedCard.priceInMinorUnit / 100).toFixed(2)}
            image={selectedCard.imgHref}
            selected={false}
            onSelect={() => {}}
          />
          <div className="mt-4 text-center">
            <p>Do you want to order this?</p>
            <button className="btn btn-primary mr-2" onClick={() => buyFood(selectedCard.priceInMinorUnit)}>Yes</button>
            <button className="btn btn-secondary" onClick={closeModal}>No</button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default GrabOrderList;
