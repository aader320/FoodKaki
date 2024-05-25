import React from 'react';

const Footer = () => {
  return (
    <footer className="fixed bottom-0 w-full bg-gray-800 text-white z-10">
      <div className="container mx-auto p-4 flex justify-around">
        <button className="btn btn-outline btn-primary">
          <img src="/path/to/image1.png" alt="Button 1" />
        </button>
        <button className="btn btn-outline btn-primary">
          <img src="/path/to/image2.png" alt="Button 2" />
        </button>
        <button className="btn btn-outline btn-primary">
          <img src="/path/to/image3.png" alt="Button 3" />
        </button>
        <button className="btn btn-outline btn-primary">
          <img src="/path/to/image4.png" alt="Button 4" />
        </button>
        <button className="btn btn-outline btn-primary">
          <img src="/path/to/image5.png" alt="Button 5" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
