"use client";

import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import GrabOrderList from '../components/GrabOrderList';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-grow overflow-auto mt-16 mb-16">
        <div className="container mx-auto p-4">
          <div className="mt-4">
            <GrabOrderList/>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
