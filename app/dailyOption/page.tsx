"use client";

import React from 'react';
import FooterTheme from '../components/FooterTheme';
import BackHeader from '../components/BackHeader';

import DailyContent from '../components/Daily/DailyContent';
import '../../styles/globals.css'


const Home: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
        <div className="m-8">
        <BackHeader />
        </div>
        
        <div >
        <DailyContent />
        </div>
      <main className="flex-grow overflow-auto mt-16 mb-16">
        <div className="container mx-auto p-4">


        </div>
      </main>
      <FooterTheme />
    </div>
  );
};

export default Home;