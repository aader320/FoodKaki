import React from 'react';
import '../styles/globals.css'
import Header from './components/Header';
import Footer from './components/Footer';
import TextBoxWithButton from './components/TextBoxWithButton';
import CalendarWidget from './components/CalendarWidget';
export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-grow overflow-auto mt-16 mb-16">
        <div className="container mx-auto p-4">
          <TextBoxWithButton />
          <div className="mt-4">
            <CalendarWidget />
          </div>
          {/* Add more content here */}
        </div>
      </main>
      <Footer />
    </div>
  );
}
