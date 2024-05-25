import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faHeart, faUser, faEllipsisH } from '@fortawesome/free-solid-svg-icons';

const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-0 w-full bg-gray-800 text-white z-10">
      <div className="container mx-auto p-4 flex justify-around">
        <button className="btn btn-outline btn-primary">
          <FontAwesomeIcon icon={faHome} size="2x" className="text-white" />
        </button>
        <button className="btn btn-outline btn-primary">
          <FontAwesomeIcon icon={faHeart} size="2x" className="text-white" />
        </button>
        <button className="btn btn-outline btn-primary">
          <FontAwesomeIcon icon={faUser} size="2x" className="text-white" />
        </button>
        <button className="btn btn-outline btn-primary">
          <FontAwesomeIcon icon={faEllipsisH} size="2x" className="text-white" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
