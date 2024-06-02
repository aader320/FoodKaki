"use client";

import React from 'react';

import FooterTheme from '../components/FooterTheme';
import BackHeader from '../components/BackHeader';

import DailyContent from '../components/Daily/DailyContent';
import OrderList from '../components/Order/OrderList';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <BackHeader />

      <main className="flex-grow overflow-auto mt-2 mb-16">
        <div className="container mx-auto p-4">
          <OrderList />
        </div>
      </main>

      <FooterTheme />
    </div>
  );
};

export default Home;
