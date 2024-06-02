import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useGlobalStore } from '../globals';

const BackHeader: React.FC = () => {
  const router = useRouter();
  const { inputFoodName } = useGlobalStore();

  useEffect(() => {
    // Check if the inputFoodName is empty or not as needed (also check if it's null or undefined if required)
    if (!inputFoodName) {
      router.replace('/'); // Use replace to avoid adding the current page to the history stack
    }
  }, [inputFoodName, router]);

  return (
    <div className="relative w-full bg-blue-600 flex justify-between items-center">
      <button className="btn" onClick={() => router.back()}>
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 1024 1024">
            <path fill="currentColor" d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64"></path>
            <path fill="currentColor" d="m237.248 512l265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312z"></path>
          </svg>
      </button>
      
      <div className="bg-blue-600 text-white text-center py-4">
        <h1 className="text-2xl font-bold">FOODKAKI</h1>
      </div>

      <button className="btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20">
          <path fill="currentColor" d="M10 6a2 2 0 1 1 0-4a2 2 0 0 1 0 4m0 6a2 2 0 1 1 0-4a2 2 0 0 1 0 4m0 6a2 2 0 1 1 0-4a2 2 0 0 1 0 4"></path>
        </svg>
      </button>
    </div>
  );
};

export default BackHeader;
