"use client";

import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import OrderList from '../components/Order/OrderList';
import { useGlobalStore } from '../globals';

const Home: React.FC = () => {
  // const { inputFoodName } = useGlobalStore();
  // console.log("selectOrder from " + inputFoodName)

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-grow overflow-auto mt-16 mb-16">
        <div className="container mx-auto p-4">
          <div className="mt-4">
            <OrderList />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;