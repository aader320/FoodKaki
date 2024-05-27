import React from 'react';
import '../styles/globals.css'
import Header from './components/Header';
import Footer from './components/Footer';
import FooterTheme from './components/FooterTheme';
import BackHeader from './components/BackHeader';
import TextBoxWithButton from './components/TextBoxWithButton';
import CalendarWidget from './components/CalendarWidget';
import MoneyBudgetWidget from './components/MoneyBudgetWidget';

export default function Home() {
  
  return (
    <div className="flex flex-col h-screen">
        <div className='m-8'>
      <BackHeader  />

        </div>
      <main className="flex-grow overflow-auto mt-16 mb-16">
        <div className="container mx-auto p-4">
          <TextBoxWithButton />
          <div className="mt-4">
            <CalendarWidget />
          </div>
          <div className="mt-4 ">
            <MoneyBudgetWidget />
          </div>
          {/* Add more content here */}
        </div>
      </main>
      <FooterTheme />
    </div>
  );
}
