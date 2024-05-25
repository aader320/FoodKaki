"use client";

import React from 'react';
import FooterTheme from '../components/FooterTheme';
import DailyContent from '../components/Daily/DailyContent';
import BackHeader from '../components/BackHeader';
import '../../styles/globals.css'


const Home: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
        <div className="m-12">
        <BackHeader />

        </div>
        <DailyContent />

      <main className="flex-grow overflow-auto mt-16 mb-16">
        <div className="container mx-auto p-4">


        </div>
      </main>
      <FooterTheme />
    </div>
  );
};

export default Home;