import React from 'react';

const NothingFound = ({ message = "Nothing here 😢" }) => {
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ animation: 'bounce 1s infinite', marginBottom: '20px' }}>
        <img src="https://twemoji.maxcdn.com/v/latest/svg/1f641.svg" alt="Sad face" style={{ width: '80px', height: '80px' }} />
      </div>
      <p style={{ fontSize: '24px', color: '#666' }}>{message}</p>
      <style jsx>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(-20px); }
          50% { transform: translateY(0px); }
        }
      `}</style>
    </div>
  );
};

export default NothingFound;