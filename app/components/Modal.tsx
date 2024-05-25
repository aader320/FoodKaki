import React from 'react';

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded shadow-lg max-w-sm w-full">
        {children}
        <button className="absolute top-2 right-2" onClick={onClose}>✕</button>
      </div>
    </div>
  );
};

export default Modal;