import React from 'react';

const Spinner = () => {
    return (
    <div className="fixed inset-0 bg-white bg-opacity-50 flex justify-center items-center z-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600"></div>
      </div>
    );
  }
  
  export default Spinner