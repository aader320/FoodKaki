"use client";

import React from 'react';
import FooterTheme from '../components/FooterTheme';
import BackHeader from '../components/BackHeader';

import GrabOrderList from '../components/GrabOrder/GrabOrderList';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <BackHeader/>
      <main className="flex-grow overflow-auto mb-16">
        <div className="container mx-auto p-4">
          <div className="mt-4">
            <GrabOrderList/>
          </div>
        </div>
      </main>
      <FooterTheme />
    </div>
  );
};

export default Home;
