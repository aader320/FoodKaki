import React from 'react';

const TextBoxWithButton: React.FC = () => {
  return (
    <div className="flex items-center border rounded shadow p-2">
      <input
        type="text"
        placeholder="What do you want to eat today?"
        className="input input-bordered w-full"
      />
      <button className="btn btn-primary ml-2">Enter</button>
    </div>
  );
};

export default TextBoxWithButton;
