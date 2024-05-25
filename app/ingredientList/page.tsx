"use client";

import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TextBoxWithButton from '../components/TextBoxWithButton';
import CalendarWidget from '../components/CalendarWidget';
import MoneyBudgetWidget from '../components/MoneyBudgetWidget';
import IngredientList from '../components/IngredientList';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-grow overflow-auto mt-16 mb-16">
        <div className="container mx-auto p-4">
          <div className="mt-4">
            <IngredientList />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
