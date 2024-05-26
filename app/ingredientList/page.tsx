"use client";

import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FooterTheme from '../components/FooterTheme';
import BackHeader from '../components/BackHeader';
import IngredientList from '../components/Ingredient/IngredientList';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="m-12">
        <BackHeader/>
      </div>
      <main className="flex-grow overflow-auto mt-16 mb-16">
        <div className="container mx-auto p-4">
          <div className="mt-4">
            <IngredientList />
          </div>
        </div>
      </main>
      <FooterTheme />
    </div>
  );
};

export default Home;
