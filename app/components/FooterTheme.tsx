"use client";
import React from 'react';
import { useRouter, usePathname } from 'next/navigation'; // Correct import

const FooterTheme: React.FC = () => {
  const path = usePathname();
  const router = useRouter();

  const buttons = [
    { path: "/", iconPaths: [{ d: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" }], label: "Home" },
    { path: "/about", iconPaths: [{ d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }], label: "...", disabled: true },
  ];

  // Function to determine if a button should be highlighted
  const isButtonActive = (buttonPath:string) => {
    if (buttonPath === "/") {
      return path === "/";
    } else {
      return path !== "/";
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-around bg-white shadow-lg py-2">
      {buttons.map((button) => (
        <button key={button.path}
                onClick={() => router.push(button.path)}
                className={`flex flex-col items-center justify-center w-full ${isButtonActive(button.path) ? "text-green-500" : "text-gray-400"}`}
                disabled={button.disabled}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {button.iconPaths.map((path, index) => (
              <path key={index} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={path.d} />
            ))}
          </svg>
          <span className="text-xs">{button.label}</span>
        </button>
      ))}
    </div>
  );
};

export default FooterTheme;
